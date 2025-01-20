function InputFile(
  formRegister,
  label,
  error,
  type,
  password,
  wrapperClassName
) {
  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <div className="form__group field shadow-md relative">
        <input
          type="file"
          className="form__field"
          placeholder={label}
          id={label}
          {...formRegister}
        />
        <label htmlFor={label} className="form__label">
          {label}
        </label>
      </div>
      {error && <span className="text-szSecondary-200">{error.message}</span>}
    </div>
  );
}

export default InputFile;
