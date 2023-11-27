import './Tag.scss';

export interface ITag {
  // BASE
  label?: string;
  color?: 'black' | 'dark' | 'light' | 'white' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
  size: 'normal' | 'medium' | 'large';

  // BOOLEAN
  isLight?: boolean;
  isRounded?: boolean;
  isDelete?: boolean;
  isButtonDelete?: boolean;

  // EVENTS
  onClick?: () => void;
  onDeleteClick?: () => void;

  // REACT
  className?: string;
}

export const Tag = ({label, color, size, isLight, isRounded, isDelete, isButtonDelete, className, onClick, onDeleteClick}: ITag) => {
  return (
    <div className="elv-component elv-tag" onClick={onClick}>
      <span
        className={[
          'tag',
          `${className ? ' ' + className : ''}`,
          `${color ? ' is-' + color : ''}`,
          `${isLight ? ' is-light' : ''}`,
          `${size ? ' is-' + size : ''}`,
          `${isRounded ? ' is-rounded' : ''}`,
          `${isDelete ? ' is-delete' : ''}`,
        ].join('')}
      >
        {label && !isDelete && label}
        {isButtonDelete && <button className={`delete is-${size}`} onClick={onDeleteClick}></button>}
      </span>
    </div>
  );
};
