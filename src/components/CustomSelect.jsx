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
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            height: "46px",
            maxHeight: "100px",
            overflowY: "auto",
            color: "#5a5a5a",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#d0ede6" : "rgb(204,204,204)",
            boxShadow: state.isFocused ? "0 0 0 1px #3ac1bd" : "none",
          }),
          option: (base, state) => ({
            ...base,
            color: state.isFocused ? "white" : "black",
            height: "100%",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#00848b",
            primary: "#3ac1bd",
          },
        })}
      />
    );
  }
);

export default CustomSelect;
