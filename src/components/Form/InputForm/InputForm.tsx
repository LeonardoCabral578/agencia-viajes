import { shortenText } from "../../../utils/functions";
import { Button, IButton } from "../../Elements/Button/Button";
import { IInput, Input } from "../Input/Input";

export interface IInputForm {
  // BASE
  label?: string;
  input?: IInput;
  helperText?: string;
  helperButton?: IButton;

  // BOOLEAN
  hasError?: boolean;
  isDisabled?: boolean;

  // EVENTS

  // REACT
  className?: string;
}

export const InputForm = ({
  label,
  input,
  helperText,
  helperButton,
  hasError,
  isDisabled,
  className,
}: IInputForm) => {
  return (
    <div className="elv-component elv-InputForm">
      <div
        className={[
          "inputform mb-4",
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
        {input && (
          <>
            <Input
              className={[
                `${!helperText && !helperButton ? " helper-padding" : ""}`,
              ].join("")}
              hasError={hasError}
              isDisabled={isDisabled}
              {...input}
            />
          </>
        )}
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
    </div>
  );
};
