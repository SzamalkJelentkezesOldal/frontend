import { Accordion } from "@mui/material";
import CustomSelect from "../../CustomSelect";
import InputText from "../../InputText";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";
import { useContext } from "react";

function AdminJelentkezokKereses() {
  const { jelentkezokSzurese, setSearchQuery, setSearchField } = useContext(
    AdminJelentkezokContext
  );

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  return (
    <section className="flex flex-col aling-center p-4 mb-10 shadow-lg bg-gray-50 w-screen sm:p-12 sm:max-w-[540px] sm:mt-10 sm:min-h-[max-content] sm:rounded-3xl xsm:px-8 sm:container sm:mb-12  md:max-w-[660px]  lg:max-w-[800px]">
      <div className="mb-2 w-1/2 md:w-1/3 lg:w-1/4">
        <CustomSelect
          onChange={(e) => setSearchField(e.value)}
          options={[
            { value: "email", label: "Email" },
            { value: "nev", label: "Név" },
          ]}
          placeholder="Keresési mező..."
          isMulti={false}
          defaultValue={0}
        />
      </div>

      <InputText
        wrapperClassName={"mb-8"}
        label="Keresés"
        type="text"
        search={true}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <p className="text-dark">További lehetőségek</p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="w-1/2">
              <p className="text-dark">Jelentkezők szűrése</p>
              <CustomSelect
                onChange={(e) => {
                  jelentkezokSzurese(e.value);
                }}
                options={[
                  { value: "1", label: "Összes jelentkező" },
                  { value: "2", label: "Csak jelentkezett" },
                  { value: "3", label: "Beiratkozás alatt" },
                ]}
                placeholder="Jelentkezők szűrése..."
                isMulti={false}
                defaultValue={0}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}

export default AdminJelentkezokKereses;
