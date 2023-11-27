import {useState} from 'react';
import './Search.scss';
import {Button, IButton} from '../../Elements/Button/Button';

export interface SearchProps {
  // BASE
  size: 'small' | 'normal' | 'medium' | 'large';
  backgroundColor?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonSearch?: IButton;

  // BOOLEAN
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;

  // EVENTS
  onChange: (label: string) => void;

  // REACT
  className?: string;
}

export const Search = ({size, backgroundColor, placeholder, defaultValue, buttonSearch, onChange, className}: SearchProps) => {
  const [stateValue, setStateValue] = useState(defaultValue);

  const handledefaultValue = (value: string) => {
    setStateValue(value);
    onChange(value);
  };

  if (defaultValue && defaultValue !== '' && stateValue === defaultValue) {
    onChange(defaultValue);
  }

  return (
    <div className={`elv-component elv-search ${className ? className : ''}`}>
      <div
        className={[`search-container`, ` search-container--${size}`, `${className ? ' ' + className : ''}`].join('')}
        style={{backgroundColor: backgroundColor}}
      >
        <input
          className="search-container__input"
          type="text"
          name=""
          id=""
          placeholder={placeholder}
          onChange={e => handledefaultValue(e.target.value)}
          value={stateValue}
        />
        <span className="search-container__button-search">
          <Button {...buttonSearch} size={size}></Button>
        </span>
      </div>
    </div>
  );
};
