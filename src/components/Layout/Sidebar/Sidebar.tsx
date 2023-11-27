import {useEffect, useState} from 'react';
import {Button} from '../../Elements/Button/Button';
import './Sidebar.scss';

export interface ISidebar {
  // BASE
  title?: string;
  position: 'left' | 'right';
  children?: React.ReactNode;

  // BOOLEAN
  hasHeader: boolean;
  isActive: boolean;

  // EVENTS
  onClickClose?: () => void;

  // REACT
  className?: string;
}

export const Sidebar = ({title, position, children, hasHeader, isActive, className, onClickClose}: ISidebar) => {
  const [activeState, setActiveState] = useState(isActive);

  useEffect(() => {
    setActiveState(isActive);
  }, [isActive]);

  return (
    <div className="elv-component elv-sidebar">
      {activeState && (
        <div
          className="modal-background"
          onClick={() => {
            setActiveState(false);
            onClickClose && onClickClose();
          }}
        ></div>
      )}
      <div
        className={[
          'sidebar-container',
          `${className ? ' ' + className : ''}`,
          ' is-flex is-flex-direction-column',
          ` sidebar-container--${position}`,
          `${activeState ? ' is-open has-shadow' : ''}`,
          ' has-background-white',
          ' pb-4 px-0',
        ].join('')}
      >
        {hasHeader && (
          <div
            className={[
              'sidebar-container__header',
              ' is-flex is-flex-direction-column',
              `${position == 'left' ? ' is-align-items-flex-end' : ''}`,
              ' px-4 py-4',
            ].join('')}
          >
            <Button
              fill="unstyled"
              icon={{icon: 'fa-solid fa-xmark', size: '30px'}}
              size="large"
              onClick={() => {
                onClickClose && onClickClose();
              }}
              isOnlyIcon
            ></Button>
            {title && title !== '' && <p className="title is-4 m-0">{title}</p>}
          </div>
        )}
        <div className="sidebar-container__content">{children}</div>
      </div>
    </div>
  );
};
