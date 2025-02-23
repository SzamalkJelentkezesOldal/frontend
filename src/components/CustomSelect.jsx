import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
const CustomSelect = React.forwardRef(
  ({ onChange, options, placeholder, isMulti }, ref) => {
    const animatedComponents = makeAnimated();

    return (
      <Select
        defaultValue={options[0] || null}
        ref={ref}
        onChange={onChange}
        isMulti={isMulti}
        options={options}
        className="basic-multi-select shadow-md"
        classNamePrefix="select"
        placeholder={placeholder}
        noOptionsMessage={() => "Nincs találat"}
        components={animatedComponents}
        styles={{
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            height: "46px",
            maxHeight: "100px",
            overflowY: "auto",
            color: "#5a5a5a",
          }),
        }}
      />
    );
  }
);

export default CustomSelect;
