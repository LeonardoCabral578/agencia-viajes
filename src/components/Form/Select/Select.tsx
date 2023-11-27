//import { Value } from 'sass';
import "./select.scss";
import { useEffect, useRef, useState } from "react";
import { generateRandomKey, shortenText } from "../../../utils/functions";

export interface ISelect {
  // base
  placeholder: string;
  options?: {
    value: string;
    label: string;
  }[];
  defaultOption?: IOption;

  // events
  onSelect?: (value: string) => void;

  // react
  className?: string;
}

interface IOption {
  value: string;
  label: string;
}

export const Select = ({
  placeholder,
  options,
  defaultOption,
  onSelect,
  className,
}: ISelect) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    defaultOption ? defaultOption : null
  );

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    setDropdownVisible(false);
    onSelect && onSelect(option.value);
  };

  // =============================== REF SELECT ===============================
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div className="elv-component elv-select" ref={selectRef}>
      <div
        className={
          "dropdown is-active is-fullw" + `${className ? " " + className : ""}`
        }
      >
        <div className="dropdown-trigger is-fullw">
          <button
            type="button"
            className="button is-fullw px-4 py-2 has-text-grey-dark is-justify-content-space-between is- is-border-box"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleToggleDropdown}
          >
            <span>
              {selectedOption
                ? shortenText(selectedOption.label, 15)
                : shortenText(placeholder, 25)}
            </span>

            <span className="icon is-small ml-1">
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>

        <div
          className={`dropdown__list dropdown-menu is-fullw py-1 px-0 mt-2 box ${
            isDropdownVisible ? "" : "is-hidden"
          }`}
        >
          {isDropdownVisible &&
            options?.map((option) => (
              <ul
                key={generateRandomKey()}
                className={`option ${
                  option === selectedOption ? "option--active" : ""
                }`}
              >
                <li
                  key={option.value}
                  className={"dropdown-item is-clickable"}
                  onClick={() => handleOptionClick(option)}
                >
                  {shortenText(option.label, 25)}
                </li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};
