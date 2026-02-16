"use-client"

import { styles } from "@/lib/styles/styles";

type InputProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({ 
    label, 
    name, 
    value, 
    placeholder, 
    type = "text", 
    onChange } : InputProps
){
  return (
    <div className={styles.input}>
      <label className={styles.inputLabel}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.inputField}
        placeholder={placeholder}
        required
      />
    </div>
  );
}