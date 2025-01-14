import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
const CustomSelect = React.forwardRef(
  ({ onChange, options, placeholder }, ref) => {
    const animatedComponents = makeAnimated();

    return (
      <Select
        ref={ref}
        onChange={onChange}
        isMulti
        options={options}
        className="basic-multi-select"
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
