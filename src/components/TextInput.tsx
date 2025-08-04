import React from "react";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default TextInput;