import { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function InputText({
  formRegister,
  label,
  error,
  type,
  password,
  wrapperClassName,
  min,
  max,
  search,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Destrukturáljuk a formRegister-ből az onChange-t és a többi attribútumot
  const { onChange: formOnChange, ...restRegister } = formRegister || {};

  // Egyesítjük a két onChange-t
  const handleChange = (e) => {
    if (formOnChange) {
      formOnChange(e);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <div className="form__group field shadow-md relative">
        <input
          type={password ? (showPassword ? "text" : "password") : type}
          className="form__field"
          placeholder={label}
          id={label}
          {...restRegister}
          min={min}
          max={max}
          onChange={handleChange}
        />
        <label htmlFor={label} className="form__label">
          {label}
        </label>
        {password && (
          <IconButton
            sx={{
              height: 40,
              width: 40,
              position: "absolute",
              right: 6,
              top: 3,
            }}
            aria-hidden={showPassword ? "true" : "false"}
            component={
              showPassword ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon
            }
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        {search && (
          <IconButton
            sx={{
              height: 40,
              width: 40,
              position: "absolute",
              right: 6,
              top: 3,
            }}
            component={search ? SearchIcon : ""}
            onClick={() => console.log("keresés")}
          />
        )}
      </div>
      {error && <span className="text-szSecondary-200">{error.message}</span>}
    </div>
  );
}

export default InputText;
