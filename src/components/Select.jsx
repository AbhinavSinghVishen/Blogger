import React, { forwardRef, useId } from "react";

const Select = ({ options, className = "", label, ...props }, ref) => {
  const Id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={Id}>{label}</label>}
      <select
        {...props}
        id={Id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {
          options?.map((option) => {
            return <option key={option} value={option}>
              {option}
            </option>;
          })

          //we can {options && options.map()} also
        }
      </select>
    </div>
  );
};

export default forwardRef(Select); //we can also use forwardRef in this way
