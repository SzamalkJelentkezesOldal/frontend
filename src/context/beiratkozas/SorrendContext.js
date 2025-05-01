import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { myAxios } from "../MyAxios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import { AuthContext } from "../AuthContext";

export const SorrendContext = createContext();

export const SorrendProvider = ({ children }) => {
  const [jelentkezesek, setJelentkezesek] = useState([]);
  const [sorrendLoading, setSorrendLoading] = useState(true);
  const { stepperActive, setStepperActive } = useContext(BeiratkozasContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [dataFetched, setDataFetched] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const sorrendSchema = z.object({});

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(sorrendSchema),
    shouldUnregister: true,
    defaultValues: {},
  });

  const sorrendLekerdez = useCallback(
    async (forceReload = false) => {
      if (!user || !user.email) {
        setSorrendLoading(false);
        return;
      }

      setSorrendLoading(true);

      try {
        const response = await myAxios.get(`/api/jelentkezesek/${user.email}`);

        if (response.data && Array.isArray(response.data)) {
          setJelentkezesek(response.data);
          setDataFetched(true);

          const isBeiratkozott = response.data.some(
            (item) =>
              item.hasOwnProperty("beiratkozott") && item.beiratkozott === 1
          );

          setIsCompleted(isBeiratkozott || stepperActive > 2);
        } else {
          setJelentkezesek([]);
        }
      } catch (e) {
        setJelentkezesek([]);
      } finally {
        setSorrendLoading(false);
      }
    },
    [user, stepperActive]
  );

  const handleSorrend = async () => {
    if (!jelentkezesek.length) {
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      // Always set beiratkozottFlag to 1 when submitting to indicate completion
      const beiratkozottFlag = 1;

      const response = await myAxios.patch(
        `/api/jelentkezesek/sorrend/${jelentkezesek[0].jelentkezo_id}/${beiratkozottFlag}`,
        {
          jelentkezesek: jelentkezesek.map((item) => ({
            szak_id: item.szak_id,
            sorrend: item.sorrend,
          })),
        }
      );

      setSubmitStatus({ loading: false, success: true, error: null });
      setIsCompleted(true);

      setJelentkezesek((prev) =>
        prev.map((item) => ({
          ...item,
          beiratkozott: 1,
        }))
      );

      if (stepperActive <= 2) {
        setStepperActive(3);

        try {
          await myAxios.post("/api/jelentkezes-stepper-update", {
            email: user.email,
            stepperActive: 3,
          });
        } catch (err) {
          // Error handling
        }

        setTimeout(() => {
          setIsOpen(false);
        }, 800);
      } else {
        setIsOpen(false);
      }
    } catch (error) {
      setSubmitStatus({ loading: false, success: false, error: error.message });
    }
  };

  useEffect(() => {
    if (user && user.email) {
      sorrendLekerdez(true);
    }
  }, [user, sorrendLekerdez]);

  useEffect(() => {
    if (!user || !user.email) {
      const retryTimer = setTimeout(() => {
        if (user && user.email) {
          sorrendLekerdez(true);
        }
      }, 800);

      return () => clearTimeout(retryTimer);
    }
  }, [user, sorrendLekerdez]);

  useEffect(() => {
    if (submitStatus.success) {
      setIsCompleted(true);

      if (stepperActive <= 2) {
        setStepperActive(3);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  }, [submitStatus.success, stepperActive, setStepperActive]);

  useEffect(() => {
    if (stepperActive > 2) {
      setIsCompleted(true);
    }
  }, [stepperActive]);

  return (
    <SorrendContext.Provider
      value={{
        jelentkezesek,
        handleSorrend,
        setJelentkezesek,
        register,
        handleSubmit,
        isSubmitting,
        sorrendLoading,
        setSorrendLoading,
        sorrendLekerdez,
        isOpen,
        setIsOpen,
        submitStatus,
        dataFetched,
        isCompleted,
      }}
    >
      {children}
    </SorrendContext.Provider>
  );
};
