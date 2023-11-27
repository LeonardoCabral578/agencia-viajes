import {useEffect, useState} from 'react';
import './Collapse.scss';
import {Icon} from '../../Elements/Icon/Icon';
import React from 'react';

export interface ICollapse {
  // BASE
  title: string;
  children: React.ReactNode;
  max_height: string;

  // BOOLEAN

  // EVENTS

  // REACT
  className?: string;
}

export const Collapse = ({title, children, max_height, className}: ICollapse) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  document.documentElement.style.setProperty('--max-height-coll', max_height ? max_height : '100px');

  useEffect(() => {
    document.documentElement.style.setProperty('--max-height-coll', max_height);
  }, [max_height]);

  return (
    <div className="elv-component elv-collapse">
      <div className={[`e-collapse mb-1 px-4 py-3`, `${isOpen ? ' open' : ''}`, `${className ? ' ' + className : ''}`].join('')}>
        <div className="e-collapse__header is-flex is-align-items-center is-justify-content-space-between" onClick={handleToggle}>
          <h3 className="m-0">{title}</h3>
          <Icon icon="fa-solid fa-chevron-down" className={`arrow ${isOpen ? 'open' : ''} has-text-grey`}></Icon>
        </div>
        <div className={`e-collapse__content ${isOpen ? 'open' : ''}`}>{children}</div>
      </div>
    </div>
  );
};
