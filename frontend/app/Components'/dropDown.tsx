"use-client"

import { styles } from "@/lib/styles/styles"

type DropdownProps = {
    label: string;
    name: string;
    value: string;
    type?: "text" | "email" | "password" | "number";
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown({
    label,
    name,
    value,
    onChange,
    options,
}: DropdownProps ) {

    return (
        <div className = {styles.input}>
            <label className={styles.inputLabel}>{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${styles.inputField} ${value === "" ? "!text-tertiary" : "!text-primary"}`}
                required
            >
                <option value="" disabled className = "text-green">
                    Select your state
                </option>

                {options.map((state) => (
                    <option key = {state} value = {state}>
                        {state}
                    </option>
                ))}        
            </select>
        </div>
    );
}
