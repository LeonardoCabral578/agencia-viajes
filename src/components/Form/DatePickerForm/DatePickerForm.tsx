import { useState } from "react";
import { shortenText } from "../../../utils/functions";
import { Button, IButton } from "../../Elements/Button/Button";
import { IInput, Input } from "../Input/Input";
import DatePicker from "react-datepicker";
import { Icon } from "@/components/Elements/Icon/Icon";

export interface IDatePickerForm {
  // BASE
  label?: string;
  helperText?: string;
  helperButton?: IButton;
  startDate: Date;
  maxDate?: Date;

  // BOOLEAN
  hasError?: boolean;
  isDisabled?: boolean;

  // EVENTS
  onDatePick?: (date: Date) => void;

  // REACT
  className?: string;
}

export const DatePickerForm = ({
  label,
  helperText,
  helperButton,
  startDate,
  maxDate,
  hasError,
  isDisabled,
  onDatePick,
  className,
}: IDatePickerForm) => {
  return (
    <div
      className={[
        "datePickerForm mb-4",
        `${className ? " " + className : ""}`,
      ].join("")}
    >
      {label && (
        <p
          className={[
            "mb-2 is-size-6",
            `${
              hasError
                ? " has-text-danger"
                : isDisabled
                ? " has-text-grey-light"
                : " has-text-grey-dark"
            }`,
          ].join("")}
        >
          {shortenText(label, 25)}
        </p>
      )}
      <div className="datePickerForm__input is-flex is-align-items-center">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => onDatePick && onDatePick(date)}
          maxDate={maxDate}
        />
        <Icon
          icon="fas fa-chevron-down"
          className="down-icon is-absolute has-text-grey-light"
        />
      </div>
      <div className="is-flex is-justify-content-space-between">
        {helperText && helperText !== "" ? (
          <p
            className={[
              " mt-1 is-size-14px",
              `${helperButton ? " helper-text-50" : " helper-text"}`,
              `${hasError ? " has-text-danger" : " has-text-grey-dark"}`,
            ].join("")}
          >
            {helperText}
          </p>
        ) : (
          <div></div>
        )}
        {helperButton && (
          <Button {...helperButton} className="is-size-14px pt-1" />
        )}
      </div>
    </div>
  );
};
