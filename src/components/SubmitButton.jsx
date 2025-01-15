function SubmitButton({ text, isSubmitting }) {
  return (
    <button
      className="p-3 self-center mt-4 w-50 bg-szSecondary-100 rounded-lg text-white w-1/2 hover:bg-red-500 duration-200 hover:shadow-lg"
      type="submit"
      disabled={isSubmitting}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
