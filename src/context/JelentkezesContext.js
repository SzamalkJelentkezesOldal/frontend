import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useRef } from "react";
import { ApiContext } from "./ApiContext";
import { myAxios } from "./MyAxios";

export const JelentkezesContext = createContext("");

export const JelentkezesProvider = ({ children }) => {
  const jelentkezesSchema = z.object({
    email: z.string().email("Érvénytelen e-mail cím!"),
    nev: z.string().min(1, "A név megadása kötelező!"),
    tel: z
      .string()         
      .length(11, "A telefonszámnak 11 karakter hosszúnak kell lennie!"),
    szakok: z
      .array(z.number())
      .min(1, "Legalább egy szakot ki kell választani!"),
    portfolioSzakok: z
      .array(
        z.object({
          szak_id: z.number(),
          portfolio_url: z.string().url("URL megadása kötelező!"),
        })
      )
      .optional()
      .refine(
        (portfolioSzakok) => {
          if (!portfolioSzakok) return true;
          return (
            portfolioSzakok.length === 0 ||
            portfolioSzakok.every((szak) => szak.portfolio_url)
          );
        },
        {
          message: "A portfólió link megadása kötelező!",
          path: ["portfolioSzakok"],
        }
      ),
  });

  const { szakLista } = useContext(ApiContext);
  const [portfolio, setPortfolio] = useState(false);
  const [portfoliosSzakok, setPortfoliosSzakok] = useState([]);
  const szakokRef = useRef();
  const [postStatus, setPostStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(jelentkezesSchema),
    shouldUnregister: true,
    defaultValues: {
      szakok: [],
    },
  });

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const jelentkezoFelvesz = async () => {
    const adatok = getValues([
      "nev",
      "email",
      "tel",
      "szakok",
      "portfolioSzakok",
    ]);

    const jelentkezoAdatok = {
      jelentkezo: { nev: adatok[0], email: adatok[1], tel: adatok[2] },
      jelentkezes: { kivalasztottSzakok: adatok[3] },
      portfolio: { portfolioSzakok: adatok[4] },
    };

    const result = await postJelentkezo(jelentkezoAdatok);

    if (result) {
      reset();
      szakokRef.current.clearValue(); // mivel a react-select nem kompatibilis a react-hook-formos reset()-el
    }
  };

  const postJelentkezo = async (data) => {
    try {
      const response = await myAxios.post("/api/uj-jelentkezo", data);
      console.log(response);
      if (response.status === 201) {
        setPostStatus(true);
        setSnackbarOpen(true);
      }
      return true;
    } catch (e) {
      console.log(e);
      setPostStatus(false);
      setSnackbarOpen(true);
      return false;
    }
  };

  function szakListaOptions() {
    const szakOptions = [];
    szakLista.map((szak) => {
      return szakOptions.push({
        value: szak.id,
        label: szak.nappali ? "N | " + szak.elnevezes : "E | " + szak.elnevezes,
        portfolio: szak.portfolio,
      });
    });
    return szakOptions;
  }

  function selectAdatok(event) {
    if (event && event.length) {
      const selectedSzakok = event.map((item) => item.value);
      setValue("szakok", selectedSzakok);

      const selectedPortfolios = event.filter((item) => item.portfolio);

      // Előző portfólió adatok megőrzése
      const currentPortfolioSzakok = watch("portfolioSzakok") || [];
      const updatedPortfolioSzakok = selectedPortfolios.map((item) => {
        // Ellenőrizzük, hogy van-e már adat az adott szakhoz
        const existingPortfolio = currentPortfolioSzakok.find(
          (portfolio) => portfolio?.szak_id === item.value
        );
        return (
          existingPortfolio || {
            szak_id: item.value,
            portfolio_url: "",
          }
        );
      });

      setValue("portfolioSzakok", updatedPortfolioSzakok);

      setPortfoliosSzakok(selectedPortfolios.map((item) => item.value));
      setPortfolio(selectedPortfolios.length > 0);
    } else {
      setPortfolio(false);
      setValue("szakok", []);
      setValue("portfolioSzakok", []);
    }
  }

  const szakOptions = szakListaOptions();

  return (
    <JelentkezesContext.Provider
      value={{
        szakOptions,
        selectAdatok,
        jelentkezoFelvesz,
        register,
        handleSubmit,
        portfolio,
        portfoliosSzakok,
        isSubmitting,
        errors,
        szakokRef,
        postStatus,
        handleSnackbarClose,
        snackbarOpen,
      }}
    >
      {children}
    </JelentkezesContext.Provider>
  );
};
