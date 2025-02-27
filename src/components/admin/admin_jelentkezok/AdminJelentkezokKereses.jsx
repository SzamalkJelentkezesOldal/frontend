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
  const { jelentkezokSzurese, setSearchQuery, setSearchField, setPageIndex } =
    useContext(AdminJelentkezokContext);

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
    <section className="w-full flex justify-center">
      <div className="flex flex-col p-4 mb-10 shadow-lg bg-gray-50 w-full sm:p-12 sm:w-[540px] sm:mt-10 sm:min-h-[max-content] sm:rounded-3xl xsm:px-8 sm:mb-12 md:w-[660px] lg:w-[800px]">
        <div className="flex items-center gap-3 mb-8">
          <div className="min-w-[100px] h-full mt-[3.5px] max-h-[45px]">
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
            wrapperClassName={"h-full w-full !mb-0"}
            label="Keresés"
            type="text"
            search={true}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPageIndex(0);
            }}
          />
        </div>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p className="text-dark">További lehetőségek</p>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div className="w-1/2">
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
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default AdminJelentkezokKereses;
