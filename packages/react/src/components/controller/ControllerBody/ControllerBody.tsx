import ControllerGraphic from './assets/controller.svg?react';
import styles from './index.module.scss';

export default function ActionButton() {
  return (
    <ControllerGraphic className={styles['c-controller-body']} />
  );
}
