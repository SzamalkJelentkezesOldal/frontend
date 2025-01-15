function CustomForm({ children, onSubmit, title }) {
  return (
    <form
      onSubmit={onSubmit}
      className="container min-w-[380px] flex flex-col aling-center pl-5 pr-7 pt-20 h-screen bg-gray-50  sm:p-12 sm:max-w-[540px] sm:mt-20 sm:h-auto sm:rounded-3xl sm:shadow-lg  sm:bg-gray-50 sm:mb-20"
    >
      <h1 className="mb-6 font-medium text-2xl text-szPrimary">{title}</h1>
      {children}
    </form>
  );
}

export default CustomForm;
