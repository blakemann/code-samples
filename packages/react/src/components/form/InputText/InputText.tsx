import type { ReactNode, FormEvent, RefObject } from 'react';
import classNames from 'classnames';
import { useContext } from 'react';
import { Type } from './types';
import styles from './index.module.scss';
import InputContainer from '@/react/components/form/InputContainer';
import { FormLoadingContext } from '@/react/contexts';
import { getUniqueId } from '@/react/utilities';

interface Props {
  label:string,
  type?:Type,
  labelParens?:string,
  description?:string,
  maxlength?:number|null,
  error?:string|null,
  disabled?:boolean,
  nullable?:boolean,
  placeholder?:string|null,
  autocomplete?:string|null,
  value?:string|null,
  onUpdateValue?: (value:string|null) => void | undefined,
  onFocus?: () => void | undefined,
  onBlur?: () => void | undefined,
  inputRef?: RefObject<HTMLInputElement>
}

const uid:string = getUniqueId('input');

export default function InputText({
  label,
  type = Type.Text,
  labelParens = '',
  description = '',
  maxlength = null,
  error = null,
  disabled = false,
  nullable = false,
  placeholder = null,
  autocomplete = null,
  value = '',
  onUpdateValue,
  onFocus,
  onBlur,
  inputRef,
}:Props) {
  // state

  const formLoading:boolean = useContext(FormLoadingContext);

  const formattedValue:string = value || '';

  const wrapperClasses:string = classNames({
    [styles['input-wrapper--loading']]: formLoading,
    [styles['input-wrapper--disabled']]: disabled,
  });

  const charCountClasses:string = classNames({
    [styles['char-count']]: true,
    [styles['char-count--over-limit']]: maxlength && formattedValue.length > maxlength,
  });

  // event handlers

  function onInput(event:FormEvent<HTMLInputElement>):void {
    const value = event?.target?.value || '';
    // get new value based on if nullable or not
    const updatedValue:string|null = (value === '' && nullable) ? null : value;
    // emit event
    onUpdateValue?.(updatedValue);
  }

  // template

  let validationMeta:ReactNode|null = null;
  if (maxlength && !formLoading) {
    validationMeta = (
      <div
        className={charCountClasses}
        data-test="characterCounter"
      >
        {formattedValue.length} / {maxlength}
      </div>
    );
  }

  return (
    <InputContainer
      uid={uid}
      label={label}
      labelParens={labelParens}
      description={description}
      error={error}
      validationMeta={validationMeta}
    >
      <div className={wrapperClasses}>
        <input
          id={uid}
          ref={inputRef}
          value={formattedValue}
          type={type}
          data-test="input"
          className={styles.input}
          { ...(placeholder ? { placeholder } : {}) }
          { ...(autocomplete ? { autocomplete } : {}) }
          { ...(formLoading || disabled ? { 'aria-disabled': 'true', disabled: true } : {}) }
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onInput}
        />
      </div>
    </InputContainer>
  );
}
