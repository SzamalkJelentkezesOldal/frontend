function InputText({ formRegister, label, error }) {
  return (
    <div className="form__group field">
      <input
        type="text"
        className="form__field"
        placeholder={label}
        {...formRegister}
      />
      <label htmlFor={label} className="form__label">
        {label}
      </label>
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}

export default InputText;
