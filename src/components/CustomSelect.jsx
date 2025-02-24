import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
const CustomSelect = React.forwardRef(
  ({ onChange, options, placeholder, isMulti, defaultValue }, ref) => {
    const animatedComponents = makeAnimated();

    const getDefaultOption = () => {
      if (defaultValue === undefined || defaultValue === null) {
        return isMulti ? [] : null;
      }

      if (isMulti) {
        if (Array.isArray(defaultValue)) {
          return defaultValue.map((index) => options[index]);
        }
        return [options[defaultValue]];
      }

      return options[defaultValue];
    };

    return (
      <Select
        defaultValue={getDefaultOption}
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
