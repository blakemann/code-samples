import { gsap } from 'gsap';
import { Transition, TransitionGroup } from 'react-transition-group';
import { useMemo, useRef, createRef, RefObject } from 'react';
import type { ReactNode } from 'react';
import styles from './index.module.scss';
import { LogEntry } from './types';
import LogItem from '@/react/components/LogItem';
import IconCross from '@/shared/assets/action-cross.svg?react';

type TransitionGroupType = InstanceType<typeof TransitionGroup>;

interface Props {
  logs: Array<LogEntry>,
}

const maxLogs:number = 3;
const logItemTransitionDuration:number = 0.3;

export default function LogBox({ logs = [] }:Props) {
  // state

  const hiddenCountMessage = useMemo<string|null>(() => {
    if (logs.length <= maxLogs) {
      return null;
    }
    const count:number = logs.length - maxLogs;
    return count === 1 ? '1 older log not displayed' : `${count} older logs not displayed`;
  }, [logs]);

  const visibleLogs = logs.slice(-maxLogs);

  // data

  const logBox = useRef<HTMLDivElement|null>(null);
  const logContainer = useRef<TransitionGroupType|null>(null);

  // event handlers

  function onEnter(ref:RefObject<HTMLDivElement|null>):void {
    if (ref.current) {
      const itemWrapper:HTMLDivElement = ref.current;
      const item:Element = itemWrapper.children[0];
      // animate item entering
      gsap.fromTo(itemWrapper, { height: 0 }, { height: 'auto', duration: logItemTransitionDuration, ease: 'power1.inOut' });
      gsap.fromTo(item, { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: logItemTransitionDuration, ease: 'power1.out' });
    }
  }

  function onExit(ref:RefObject<HTMLDivElement|null>):void {
    if (ref.current) {
      const itemWrapper:HTMLDivElement = ref.current;
      const item:Element = itemWrapper.children[0];
      const wrapperHeight:number = itemWrapper.offsetHeight;
      // animate item leaving
      gsap.fromTo(itemWrapper, { height: wrapperHeight }, { height: 0, duration: logItemTransitionDuration, ease: 'power1.inOut' });
      gsap.fromTo(item, { scale: 1, opacity: 1 }, { scale: 0.75, opacity: 0, duration: logItemTransitionDuration, ease: 'power1.out' });
    }
  }

  // template

  let primaryContent:ReactNode|undefined;
  if (logs.length === 0) {
    primaryContent = (
      <div className={styles['empty-state']}>
        <h2 className={styles['start-message-primary']}>
          Press&nbsp;
          <span className={styles['cross-symbol']}>
            x
            <IconCross
              role="presentation"
              aria-hidden="true"
            />
          </span>
          &nbsp;to Start
        </h2>
        <span className={styles['start-message-secondary']}>(or any other button 😉)</span>
      </div>
    );
  } else {
    primaryContent = (
      <h2 className={styles['logs-heading']}>
        Input Log
      </h2>
    );
  }

  const hiddenCount = hiddenCountMessage && (
    <div className={styles['hidden-count']}>
      {hiddenCountMessage}
    </div>
  );

  const logElements = visibleLogs.map((log) => {
    const nodeRef:RefObject<HTMLDivElement> = createRef();
    return (
      <Transition
        key={log.timestamp}
        timeout={{ enter: logItemTransitionDuration * 1000, exit: logItemTransitionDuration * 1000 }}
        nodeRef={nodeRef}
        onEnter={() => onEnter(nodeRef)}
        onExit={() => onExit(nodeRef)}
      >
        <div
          ref={nodeRef}
          className={styles['log-item-wrapper']}
        >
          <LogItem
            input={log.input}
            data={log.data}
          />
        </div>
      </Transition>
    );
  });

  return (
    <div
      ref={logBox}
      className={styles['c-log-box']}
    >
      {primaryContent}
      {hiddenCount}
      <TransitionGroup
        ref={logContainer}
        className={styles['log-items']}
      >
        {logElements}
      </TransitionGroup>
    </div>
  );
}
