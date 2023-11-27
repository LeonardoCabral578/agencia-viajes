//import { Value } from 'sass';
import './selectForm.scss';
import {shortenText} from '../../../utils/functions';
import {ISelect, Select} from '../Select/Select';
import {Button, IButton} from '../../Elements/Button/Button';

export interface ISelectForm {
  // base
  label?: string;
  select: ISelect;
  helperText?: string;
  helperButton?: IButton;

  // boolean
  hasError?: boolean;
  isDisabled?: boolean;

  // react
  className?: string;
}

export const SelectForm = ({label, select, helperText, helperButton, hasError, isDisabled, className}: ISelectForm) => {
  return (
    <div className="elv-component elv-selectform">
      <div className={['selectform mb-3', `${className ? ' ' + className : ''}`].join('')}>
        {label && (
          <p
            className={[
              'mb-2 is-size-6',
              `${hasError ? ' has-text-danger' : isDisabled ? ' has-text-grey-light' : ' has-text-grey-dark'}`,
            ].join('')}
          >
            {shortenText(label, 25)}
          </p>
        )}
        {select && (
          <div className={[`${!helperText && !helperButton ? ' helper-padding' : ''}`].join('')}>
            <Select {...select} />
          </div>
        )}
        <div className="is-flex is-justify-content-space-between">
          {helperText && helperText !== '' && (
            <p
              className={[
                ' mt-1 is-size-7',
                `${helperButton ? ' helper-text-50' : ' helper-text'}`,
                `${hasError ? ' has-text-danger' : ' has-text-grey-dark'}`,
              ].join('')}
            >
              {helperText}
            </p>
          )}
          {helperButton && <Button {...helperButton} className="is-size-14px pt-1" />}
        </div>
      </div>
    </div>
  );
};
