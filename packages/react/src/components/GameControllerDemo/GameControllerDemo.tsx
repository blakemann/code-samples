import { cloneDeep } from 'lodash-es';
import { useState } from 'react';
import styles from './index.module.scss';
import type { Input } from '@/shared/utilities/constants';
import GameController from '@/react/components/GameController';
import LogBox from '@/react/components/LogBox';
import type { LogEntry } from '@/react/components/LogBox';
import type { LogItemData } from '@/react/components/LogItem';

export default function GameControllerDemo() {
  // state

  const [logs, setLogs] = useState<LogEntry[]>([]);

  // event handlers

  function onInput(input:Input, data:LogItemData):void {
    setLogs((prev) => [...prev, {
      timestamp: Date.now(),
      input,
      data,
    }]);
  }

  function onUpdateInputData(data:LogItemData):void {
    setLogs((prev) => {
      const clone:LogEntry[] = cloneDeep(prev);
      const log: LogEntry = clone[clone.length - 1];
      log.data = data;
      return clone;
    });
  }

  // template

  return (
    <div className={styles['c-game-controller-demo']}>
      <h1>Game Controller Demo</h1>
      <div className={styles['demo-content']}>
        <div className={styles['log-box']}>
          <LogBox logs={logs} />
        </div>
        <div className={styles['game-controller']}>
          <GameController
            onInput={onInput}
            onUpdateInputData={onUpdateInputData}
          />
        </div>
      </div>
    </div>
  );
}
