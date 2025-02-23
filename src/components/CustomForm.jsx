function CustomForm({ children, onSubmit, title, className }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col aling-center p-2 pt-20 min-h-screen w-full bg-gray-50  sm:p-12 sm:max-w-[540px] sm:mt-20 sm:min-h-[max-content] sm:rounded-3xl sm:shadow-lg xsm:px-8 sm:container  sm:bg-gray-50 sm:mb-20 ${className}`}
    >
      <h1 className="mb-6 font-medium text-2xl text-szPrimary">{title}</h1>
      {children}
    </form>
  );
}

export default CustomForm;
