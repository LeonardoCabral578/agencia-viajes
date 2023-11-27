// import './button.scss';
import { Icon, IconProps } from "../Icon/Icon";

export interface IButton {
  // BASE
  color?:
    | "white"
    | "dark"
    | "primary"
    | "link"
    | "info"
    | "success"
    | "warning"
    | "danger";
  type?: "button" | "submit" | "reset";
  size?: "small" | "normal" | "medium" | "large";
  fill?: "solid" | "outline" | "unstyled" | "link";
  icon?: IconProps;
  label?: string;

  // BOOLEAN
  isLight?: boolean;
  isFullWidth?: boolean;
  isRounded?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isTrailingIcon?: boolean;
  isOnlyIcon?: boolean;

  // EVENTS
  onClick?: () => void;

  //REACT
  className?: string;
}

export const Button = ({
  color = "primary",
  type = "button",
  size = "normal",
  fill = "solid",
  isLight,
  isFullWidth,
  isRounded,
  isOnlyIcon,
  isLoading = false,
  isDisabled = false,
  icon,
  isTrailingIcon = false,
  label,
  onClick,
  className,
  ...props
}: IButton) => {
  return (
    <div className="elv-component elv-button">
      <button
        type={type}
        className={[
          "button",
          `${fill === "solid" || fill === "outline" ? " is-" + color : ""}`,
          `${fill === "link" ? " is-ghost" : ""}`,
          `${fill === "outline" ? " is-outlined" : ""}`,
          `${fill === "unstyled" ? " is-unstyled" : ""}`,
          `${size !== "normal" ? " is-" + size : ""}`,
          `${isLight ? " is-light" : ""}`,
          `${isTrailingIcon ? " button__icon--trailing" : ""}`,
          `${isFullWidth ? " is-fullwidth" : ""}`,
          `${isLoading ? " is-loading" : ""}`,
          `${isOnlyIcon ? " is-only-icon" : ""}`,
          `${isRounded ? " is-rounded" : ""}`,
          `${className ? " " + className : ""}`,
        ].join("")}
        onClick={onClick}
        disabled={isDisabled}
        {...props}
      >
        <div className="button-content is-flex">
          {isTrailingIcon ? (
            <>
              {label}
              {icon && (
                <Icon {...icon} className={"button__icon " + icon.className} />
              )}
            </>
          ) : (
            <>
              {icon && (
                <Icon {...icon} className={"button__icon " + icon.className} />
              )}
              {label}
            </>
          )}
        </div>
      </button>
    </div>
  );
};
