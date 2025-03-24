import styles from './index.module.scss';

interface Props {
  name: string,
  age: number|null,
}

export default function ProfileCard({ name, age }:Props) {
  // template

  return (
    <div className={styles['profile-card']}>
      <h2 className={styles.heading}>
        User Profile
      </h2>
      <div className={styles.fields}>
        <div className={styles.field}>
          <h3 className={styles['field-label']}>
            Name
          </h3>
          <span
            className={styles['field-value']}
            data-test="name"
          >
            {name || <>&ndash;</>}
          </span>
        </div>
        <div className={styles['field']}>
          <h3 className={styles['field-label']}>
            Age
          </h3>
          <span
            className={styles['field-value']}
            data-test="age"
          >
            {age || <>&ndash;</>}
          </span>
        </div>
      </div>
    </div>
  );
}
