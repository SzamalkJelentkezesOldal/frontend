function InputText({ formRegister, label, error, type }) {
  return (
    <div className="mb-4">
      <div className="form__group field">
        <input
          type={type}
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

export default InputText;
