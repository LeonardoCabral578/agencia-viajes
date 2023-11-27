"use client";
import { useRef, useState } from "react";
// import "./radio.scss";

export interface RadioProps {
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
  onCheck?: (value: string) => void;

  // REACT
  className?: string;
}

export const Radio = ({
  size = "md",
  disabled = false,
  label = "radio",
  name,
  value,
  defaultChecked,
  onCheck,
  error,
  className,
  ...props
}: RadioProps) => {
  const radioRef = useRef<HTMLInputElement>(null);

  const toggleChecked = () => {
    if (radioRef.current) {
      if (radioRef.current.checked) {
        onCheck && onCheck(value);
      }
    }
  };

  return (
    <div className="elv-component elv-radio elv-control">
      <label
        className={[
          "e-control e-radio",
          `${className ? " " + className : ""}`,
          ` e-control--${size} e-radio--${size}`,
          `${error ? ` e-control--error e-radio--error` : ""}`,
          `${disabled ? ` e-control--disabled e-radio--disabled` : ""}`,
          " is-relative",
          " is-flex is-flex-direction-row-reverse is-justify-content-flex-end",
          " has-text-dark",
          " is-clickable",
        ].join("")}
      >
        <input
          type="radio"
          defaultChecked={defaultChecked}
          name={name}
          value={value}
          className={[
            "e-control__input e-radio__input",
            "m-0",
            "is-clickable",
          ].join("")}
          onChange={() => {
            toggleChecked();
          }}
          disabled={disabled}
          ref={radioRef}
          {...props}
        />
        {label && (
          <span className="label-text is-flex is-align-items-center">
            {label}
          </span>
        )}
        <span
          className={[
            "e-control__checkmark e-radio__checkmark",
            " is-flex is-align-items-center is-justify-content-center is-relative",
          ].join("")}
        />
      </label>
    </div>
  );
};
