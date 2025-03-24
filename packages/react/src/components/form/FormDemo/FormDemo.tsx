import { useState } from 'react';
import styles from './index.module.scss';
import InputText from '@/react/components/form/InputText';
import InputNumber from '@/react/components/form/InputNumber';
import ProfileCard from '@/react/components/form/ProfileCard';

export default function FormDemo() {
  // state

  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string|null>(null);

  // template

  return (
    <div className={styles['form-demo']}>
      <h1 className={styles.heading}>Form Demo</h1>
      <div className={styles['demo-content']}>
        <div className={styles['fields']}>
          <InputText
            value={name}
            onUpdateValue={setName}
            label="What is your name?"
          />
          <InputNumber
            value={age}
            onUpdateValue={setAge}
            label="How old are you?"
          />
        </div>
        <div className={styles['sidebar']}>
          <ProfileCard
            name={name}
            age={age}
          />
        </div>
      </div>
    </div>
  );
}
