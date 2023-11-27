import './Notification.scss';

export interface INotification {
  // BASE
  label: string;
  color?: 'light' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';

  // BOOLEAN
  isLight?: boolean;
  isDeleteButton?: boolean;

  // EVENTS
  onClick?: () => void;
  onDeleteClick?: () => void;

  // REACT
  className?: string;
}

export const Notification = ({label, color, isLight, isDeleteButton, className, onClick, onDeleteClick}: INotification) => {
  return (
    <div className="elv-component elv-notification" onClick={onClick}>
      <div
        className={[
          'notification',
          `${className ? ' ' + className : ''}`,
          `${color ? ' is-' + color : ''}`,
          `${isLight ? ' is-light' : ''}`,
        ].join('')}
      >
        {isDeleteButton && <button className="delete" onClick={onDeleteClick}></button>}
        <label dangerouslySetInnerHTML={{__html: label}} />
      </div>
    </div>
  );
};
