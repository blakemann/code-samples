import type { ReactNode, PropsWithChildren } from 'react';
import IconCircleExclamation from '@fortawesome/fontawesome-free/svgs/solid/circle-exclamation.svg?react';
import classNames from 'classnames';
import { useContext } from 'react';
import styles from './index.module.scss';
import { FormLoadingContext } from '@/react/contexts';

interface Props {
  uid: string,
  label?: string,
  labelParens?: string,
  description?: string,
  error?: string|null,
  collapseErrorSpace?: boolean,
  hiddenLabel?: boolean,
  infoMeta?: ReactNode|null,
  validationMeta?: ReactNode|null,
}

export default function InputContainer({
  uid,
  label = '',
  labelParens = '',
  description = '',
  error = null,
  collapseErrorSpace = false,
  hiddenLabel = false,
  children,
  infoMeta = null,
  validationMeta = null,
}:PropsWithChildren<Props>) {
  // state

  const formLoading = useContext(FormLoadingContext);

  const containerClasses:string = classNames({
    [styles[`input-container--loading`]]: formLoading,
  });

  const infoClasses:string = classNames({
    [styles.info]: true,
    [styles['info--hidden']]: hiddenLabel,
  });

  const errorClasses:string = classNames({
    [styles['error-indicator']]: true,
    [styles['error-indicator--visible']]: error,
  });

  // template

  let labelTemplate:ReactNode|null = null;
  if (label || labelParens) {
    labelTemplate = (
      <div className={styles.label}>
        { label ? (
          <label
            htmlFor={uid}
            data-test="label"
          >
            {label}
          </label>
        ) : null }
        { labelParens ? (
          <span
            className={styles['label-parens']}
            data-test="labelParens"
          >
            ({labelParens})
          </span>
        ) : null }
      </div>
    );
  }

  let descriptionTemplate:ReactNode|null = null;
  if (description) {
    descriptionTemplate = (
      <div
        className={styles.description}
        data-test="description"
      >
        {description}
      </div>
    );
  }

  let validationTemplate:ReactNode|null = null;
  if ((!collapseErrorSpace || error) || validationMeta) {
    validationTemplate = (
      <div className={styles.validation}>
        { !collapseErrorSpace || error ? (
          <div
            className={styles['error-message']}
            data-test="errorMessage"
          >
            {error ? `This ${error}` : ''}
          </div>
        ) : null }
        <div className={styles['validation-meta']}>
          {validationMeta}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div
        className={infoClasses}
        data-test="info"
      >
        {labelTemplate}
        <div className={styles['info-meta']}>
          {infoMeta}
        </div>
      </div>
      {descriptionTemplate}
      <div className={styles['field-wrapper']}>
        {children}
        <div
          className={errorClasses}
          data-test="errorIndicator"
        >
          <IconCircleExclamation />
        </div>
      </div>
      {validationTemplate}
    </div>
  );
}
