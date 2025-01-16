import SubmitSpinner from "./icons/SubmitSpinner";

function SubmitButton({ text, isSubmitting, onClick }) {
  return (
    <button
      className="p-3 self-center mt-4 w-50 bg-szPrimary rounded-lg text-white w-1/2 hover:bg-szPrimary/80 duration-200 hover:shadow-lg font-medium tracking-wider text-md hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
      type="submit"
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? <SubmitSpinner /> : ""}
      {text}
    </button>
  );
}

export default SubmitButton;
