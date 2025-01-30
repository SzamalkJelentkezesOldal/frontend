function InputNumber({
  formRegister,
  label,
  error,
  currentValue,
  min,
  max,
  name,
  setValue,
}) {
  const handleChange = (delta) => {
    const newValue = currentValue + delta;
    if (newValue >= min && newValue <= max) {
      setValue(name, newValue);
    }
  };

  return (
    <div className="w-full max-w-sm relative mb-6">
      <label className="block absolute left-3 top-4 mb-2 text-xl text-inputGray z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 -960 960 960"
          fill="#8b8b8b"
        >
          <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80zm280 240q-17 0-28.5-11.5T440-440t11.5-28.5T480-480t28.5 11.5T520-440t-11.5 28.5T480-400m-160 0q-17 0-28.5-11.5T280-440t11.5-28.5T320-480t28.5 11.5T360-440t-11.5 28.5T320-400m320 0q-17 0-28.5-11.5T600-440t11.5-28.5T640-480t28.5 11.5T680-440t-11.5 28.5T640-400M480-240q-17 0-28.5-11.5T440-280t11.5-28.5T480-320t28.5 11.5T520-280t-11.5 28.5T480-240m-160 0q-17 0-28.5-11.5T280-280t11.5-28.5T320-320t28.5 11.5T360-280t-11.5 28.5T320-240m320 0q-17 0-28.5-11.5T600-280t11.5-28.5T640-320t28.5 11.5T680-280t-11.5 28.5T640-240" />
        </svg>
      </label>
      <div className="relative">
        <button
          className={`absolute right-12 top-3 rounded-lg p-1 border-2 text-base text-white ${
            currentValue <= min
              ? "bg-szPrimary/40 cursor-not-allowed"
              : "bg-szPrimary hover:bg-szPrimary/80"
          }`}
          type="button"
          onClick={() => handleChange(-1)}
          disabled={currentValue <= min}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
        <input
          {...formRegister(name, {
            valueAsNumber: true,
            min: { value: min, message: `Minimum érték: ${min}` },
            max: { value: max, message: `Maximum érték: ${max}` },
          })}
          type="number"
          min={min}
          max={max}
          className="w-full bg-white text-inputGray text-lg border-2 border-slate-200 rounded-lg pl-10 pr-24 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-md focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          className={`absolute right-3 top-3 rounded-lg p-1 border-2 text-base text-white ${
            currentValue >= max
              ? "bg-szPrimary/40 cursor-not-allowed"
              : "bg-szPrimary hover:bg-szPrimary/80"
          }`}
          type="button"
          onClick={() => handleChange(1)}
          disabled={currentValue >= max}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>
      {error && (
        <span className="text-szSecondary-200 text-sm leading-tight">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default InputNumber;
