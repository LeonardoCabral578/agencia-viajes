import { useState } from "react";
import { IconProps, Icon } from "../../Elements/Icon/Icon";
// import './input.scss';

export interface IInput {
  //BASE
  type: "text" | "password" | "email" | "tel" | "number";
  color:
    | "none"
    | "primary"
    | "link"
    | "info"
    | "success"
    | "warning"
    | "danger";
  size: "small" | "normal" | "medium" | "large";
  placeholder?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;

  iconLeft?: IconProps;
  iconRight?: IconProps;

  //IS-OPTIONS
  isRounded?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;

  //GENERIC
  className?: string;
  onChange?: (value: string) => void;
}

export const Input = ({
  type,
  color,
  size,
  placeholder,
  defaultValue,
  minLength,
  maxLength,
  iconLeft,
  iconRight,
  isRounded,
  isLoading,
  isDisabled,
  hasError,
  className,
  onChange,
}: IInput) => {
  return (
    <div className="elv-component elv-input">
      <div
        className={[
          "field e-input",
          `${className ? " " + className : ""}`,
        ].join("")}
      >
        <p
          className={[
            "control",
            `${iconLeft ? " has-icons-left" : ""}`,
            `${iconRight ? " has-icons-right" : ""}`,
          ].join("")}
        >
          <input
            className={[
              "input",
              `${" is-" + size}`,
              `${hasError ? " is-danger" : " is-" + color}`,
              `${isRounded ? " is-rounded" : ""}`,
              `${isLoading ? " is-loading" : ""}`,
              `${isDisabled ? " is-disabled" : ""}`,
            ].join("")}
            type={type}
            placeholder={placeholder}
            disabled={isDisabled}
            defaultValue={defaultValue}
            minLength={minLength}
            maxLength={maxLength}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          {iconLeft && (
            <span className={`icon is-left ${"is-" + size}`}>
              <Icon {...iconLeft}></Icon>
            </span>
          )}
          {iconRight && (
            <span className={`icon is-right ${"is-" + size}`}>
              <Icon {...iconRight}></Icon>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
