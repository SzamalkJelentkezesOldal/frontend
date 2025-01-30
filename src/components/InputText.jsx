import { useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";

function InputText({
  formRegister,
  label,
  error,
  type,
  password,
  wrapperClassName,
  min,
  max,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <div className="form__group field shadow-md relative">
        <input
          type={password ? (showPassword ? "text" : "password") : type}
          className="form__field"
          placeholder={label}
          id={label}
          {...formRegister}
          min={min}
          max={max}
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
      </div>
      {error && <span className="text-szSecondary-200">{error.message}</span>}
    </div>
  );
}

export default InputText;
