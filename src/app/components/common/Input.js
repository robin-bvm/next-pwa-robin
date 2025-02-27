import React from "react";

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  ...options
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {type != "checkbox" &&
        (type != "number" && (
          <label htmlFor={name}>{name && `${name} :`}</label>
        ))}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`border border-gray-400 rounded-sm ${className}`}
        onChange={onChange}
        {...options}
      />

      {type == "checkbox" && placeholder}
    </div>
  );
};

export default Input;
