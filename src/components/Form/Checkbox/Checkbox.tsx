import { useState } from "react";
import "./checkbox.scss";
import "/src/styles/base/_controls.scss";

export interface CheckboxProps {
  // BASE
  size?: "sm" | "md" | "lg";
  label?: string;
  value: string;
  name: string;

  // BOOLEAN
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;

  // EVENTS
  onCheck?: (checked: boolean) => void;

  // REACT
  className?: string;
}
export const Checkbox = ({
  size = "md",
  label = "checkbox",
  value,
  name,
  className,
  defaultChecked,
  error,
  disabled = false,
  //hover,
  onCheck,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    defaultChecked ? defaultChecked : false
  );

  const toggleChecked = () => {
    setIsChecked(!isChecked);
    onCheck && onCheck(!isChecked);
  };

  return (
    <div className="elv-component elv-checkbox elv-control">
      <label
        className={[
          "e-control e-checkbox",
          `${className ? " " + className : ""}`,
          ` e-control--${size} e-checkbox--${size}`,
          `${error ? ` e-control--error e-checkbox--error` : ""}`,
          `${disabled ? ` e-control--disabled e-checkbox--disabled` : ""}`,
          " is-relative",
          " is-flex is-flex-direction-row-reverse is-justify-content-flex-end",
          " has-text-dark",
          " is-clickable",
        ].join("")}
      >
        <input
          type="checkbox"
          onChange={() => {
            toggleChecked();
          }}
          defaultChecked={defaultChecked}
          value={value}
          name={name}
          className={["e-control__input e-checkbox__input"].join("")}
          disabled={disabled}
          {...props}
        />
        {label && (
          <span className="label-text is-flex is-align-items-center">
            {label}
          </span>
        )}

        <span
          className={[
            "e-control__checkmark e-checkbox__checkmark",
            " is-flex is-align-items-center is-justify-content-center is-relative",
          ].join("")}
        />
      </label>
    </div>
  );
};
