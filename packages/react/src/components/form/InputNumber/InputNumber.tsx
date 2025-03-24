import type { ReactNode, FormEvent, RefObject, WheelEvent } from 'react';
import IconPlus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg?react';
import IconMinus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg?react';
import classNames from 'classnames';
import { useContext } from 'react';
import styles from './index.module.scss';
import InputContainer from '@/react/components/form/InputContainer';
import { FormLoadingContext } from '@/react/contexts';
import { getUniqueId } from '@/react/utilities';

interface Props {
  label:string,
  labelParens?:string,
  description?:string,
  min?:number,
  max?:number,
  step?:number,
  showStepButtons?:boolean,
  error?:string|null,
  disabled?:boolean,
  nullable?:boolean,
  value?:number|null,
  onUpdateValue?: (value:number|null) => void | undefined,
  onFocus?: () => void | undefined,
  onBlur?: () => void | undefined,
  inputRef?: RefObject<HTMLInputElement>
}

const uid:string = getUniqueId('input');

export default function InputText({
  label,
  labelParens = '',
  description = '',
  min = 0,
  max = 1000000,
  step = 1,
  showStepButtons = true,
  error = null,
  disabled = false,
  nullable = false,
  value = 0,
  onUpdateValue,
  onFocus,
  onBlur,
  inputRef,
}:Props) {
  // state

  const formLoading:boolean = useContext(FormLoadingContext);

  const formattedValue:string = value === null ? '' : String(value);

  const stepButtonsAllowed:boolean = showStepButtons && !disabled;

  const wrapperClasses:string = classNames({
    [styles['input-wrapper']]: true,
    [styles['input-wrapper--loading']]: formLoading,
    [styles['input-wrapper--disabled']]: disabled,
  });

  const inputClasses:string = classNames({
    [styles.input]: true,
    [styles['input--has-step-buttons']]: stepButtonsAllowed,
  });

  // event handlers

  function onInput(event:FormEvent<HTMLInputElement>):void {
    const value = event?.target?.value || '';
    // get new value based on if nullable or not
    const updatedValue:number|null = (value === '' && nullable) ? null : Number(value);
    // emit event
    emitUpdate(updatedValue);
  }

  function onIncrement():void {
    const currentValue:number = value === null ? min : value;
    emitUpdate(currentValue + step);
  }

  function onDecrement():void {
    const currentValue:number = value === null ? max : value;
    emitUpdate(currentValue - step);
  }

  function onWheel(event:WheelEvent<HTMLInputElement>):void {
    if (disabled) {
      return;
    }
    if (event.deltaY > 0) {
      onIncrement();
    } else {
      onDecrement();
    }
  }

  function emitUpdate(updatedValue:number|null):void {
    if (updatedValue === null) {
      onUpdateValue?.(null);
      return;
    }
    const clampedValue:number = Math.max(min, Math.min(max, updatedValue));
    onUpdateValue?.(clampedValue);
  }

  // template

  let stepButtonsTemplate:ReactNode|null = null;
  if (stepButtonsAllowed) {
    stepButtonsTemplate = (
      <>
        <button
          type="button"
          onClick={onDecrement}
          className={`${styles['step-button']} ${styles['step-button--decrement']}`}
          aria-label="Decrease"
          tabIndex={-1}
          data-test="decrementButton"
        >
          <IconMinus/>
        </button>
        <button
          type="button"
          onClick={onIncrement}
          className={`${styles['step-button']} ${styles['step-button--increment']}`}
          aria-label="Increase"
          tabIndex={-1}
          data-test="incrementButton"
        >
          <IconPlus/>
        </button>
      </>
    );
  }

  return (
    <InputContainer
      uid={uid}
      label={label}
      labelParens={labelParens}
      description={description}
      error={error}
    >
      <div className={wrapperClasses}>
        <input
          id={uid}
          ref={inputRef}
          value={formattedValue}
          type="text"
          inputMode="decimal"
          aria-valuenow={value === null ? undefined : value}
          aria-valuemin={min}
          aria-valuemax={max}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          tabIndex={0}
          role="spinbutton"
          aria-label={label}
          aria-roledescription="Number field"
          data-test="input"
          className={inputClasses}
          { ...(formLoading || disabled ? { 'aria-disabled': 'true', disabled: true } : {}) }
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onInput}
          onWheel={onWheel}
        />
        {stepButtonsTemplate}
      </div>
    </InputContainer>
  );
}
