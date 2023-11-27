import { useEffect, useRef, useState } from "react";
import { shortenText } from "../../../utils/functions";
import { Icon, IconProps } from "../../Elements/Icon/Icon";
import "./Dropdown.scss";
import { Button, IButton } from "../../Elements/Button/Button";

export interface IDropdown {
  // BASE
  title?: { label: string };
  options?: { label: string; icon?: IconProps; onClick?: () => void }[];
  position?: "left" | "center" | "right";
  trigger?: IButton;

  // BOOLEAN
  visible: boolean;

  // EVENTS

  // REACT
  className?: string;
}

export const Dropdown = ({
  title,
  options,
  position,
  trigger,
  visible,
  className,
}: IDropdown) => {
  const [visibleState, setVisibleState] = useState(visible ? visible : false);

  useEffect(() => {
    setVisibleState(visible);
  }, [visible]);

  // =============================== REF DROP ===============================
  const dropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setVisibleState(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropRef]);

  return (
    <>
      {trigger ? (
        <div
          className={[
            "elv-component",
            " elv-dropdown elv-dropdown--trigger",
            `${position ? " elv-dropdown--" + position : ""}`,
            `${className ? " " + className : ""}`,
          ].join("")}
          ref={dropRef}
        >
          <Button
            {...trigger}
            onClick={() => {
              setVisibleState(!visibleState);
            }}
          />
          <div
            className={[
              `dropdown ${visibleState ? "is-active" : ""}`,
              `${position ? " dropdown--" + position : ""}`,
            ].join("")}
          >
            <div
              className={["dropdown-menu"].join("")}
              id="dropdown-menu"
              role="menu"
            >
              <div
                className={[
                  "dropdown-content pt-0",
                  ` tp tp--${position}`,
                ].join("")}
              >
                {title && (
                  <>
                    <h3 className="title is-6 m-0 p-4">{title.label}</h3>
                    <hr className="dropdown-divider" />
                  </>
                )}
                {options?.map((item, index) =>
                  item.label === "dropdown-divider" ? (
                    <hr
                      key={item.label + "-key-option"}
                      className="dropdown-divider"
                    />
                  ) : (
                    <div className="is-flex" key={item.label + "-key-option"}>
                      <a
                        className="dropdown-item is-size-6 pl-4 is-flex"
                        onClick={() => item.onClick && item.onClick()}
                      >
                        {item.icon && (
                          <Icon {...item.icon} className={"pr-3"} />
                        )}
                        {item.label}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={[
            "elv-component",
            " elv-dropdown elv-dropdown--not-trigger",
            `${position ? " elv-dropdown--not-trigger--" + position : ""}`,
          ].join("")}
          ref={dropRef}
        >
          <div
            className={[
              `dropdown ${visibleState ? "is-active" : ""} `,
              `${className ? " " + className : ""}`,
            ].join("")}
          >
            <div
              className={[
                "dropdown-menu",
                `${position ? " dropdown-menu--" + position : ""}`,
              ].join("")}
              id="dropdown-menu"
              role="menu"
            >
              <div
                className={[
                  "dropdown-content pt-0",
                  ` tp tp--${position}`,
                ].join("")}
              >
                {title && (
                  <>
                    <h3 className="title is-6 m-0 p-4">{title.label}</h3>
                    <hr className="dropdown-divider" />
                  </>
                )}
                {options?.map((item, index) =>
                  item.label === "dropdown-divider" ? (
                    <hr
                      key={item.label + "-key-option"}
                      className="dropdown-divider"
                    />
                  ) : (
                    <div className="is-flex" key={item.label + "-key-option"}>
                      <a
                        className="dropdown-item is-size-6 pl-4 is-flex"
                        onClick={() => item.onClick && item.onClick()}
                      >
                        {item.icon && (
                          <Icon {...item.icon} className={"pr-3"} />
                        )}
                        {item.label}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
