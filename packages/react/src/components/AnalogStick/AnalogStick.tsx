import classNames from 'classnames';
import { gsap } from 'gsap';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useGlobalRelease } from '@/react/hooks';
import type { Coord } from '@/shared/utilities/trigonometry';
import { getAngle, getPointAlongAngle } from '@/shared/utilities/trigonometry';
import styles from './index.module.scss';
import graphicSrc from './assets/analog-stick.png?url';
import graphicEdgeSrc from './assets/analog-stick-edge.png?url';

interface Props {
  angle: number,
  force: number,
  onGrabbed: () => void | undefined,
  onReleased: () => void | undefined,
  onUpdateAngle: (angle:number) => void | undefined,
  onUpdateForce: (force:number) => void | undefined,
}

export default function AnalogStick({ angle = 0, force = 0, onGrabbed, onReleased, onUpdateAngle, onUpdateForce }:Props) {
  // state

  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);

  const rootClasses = classNames({
    [styles['c-analog-stick']]: true,
    [styles['c-analog-stick--grabbed']]: isGrabbed,
  });

  // data

  const grabOrigin = useRef<Coord>({ x: 0, y: 0 });
  const maxRotation = useRef<number>(40); // degrees
  const bounds = useRef<DOMRect|null>(null);
  const root = useRef(null);
  const graphic = useRef(null);
  const graphicEdge = useRef(null);

  // effects

  const onMouseMove = useCallback((e:MouseEvent):void => {
    if (isGrabbed && bounds.current) {
      // get radius of boundary circle
      const radius: number = (bounds.current.width / 2) * 0.8;
      // get the current x/y distance that the mouse has moved
      const distance: Coord = {
        x: e.clientX - grabOrigin.current.x,
        y: e.clientY - grabOrigin.current.y,
      };
      // get angle between mouse start and current positions
      onUpdateAngle?.(getAngle(grabOrigin.current.x, grabOrigin.current.y, e.clientX, e.clientY));
      // get the furthest point that the stick can move along current angle
      const maxDistance: Coord = getPointAlongAngle(0, 0, angle, radius);
      // get a value between 0 and 1 representing how far the stick has moved between center and boundary
      const totalLength: number = Math.abs(maxDistance.x) + Math.abs(maxDistance.y);
      const totalMaxLength: number = Math.abs(distance.x) + Math.abs(distance.y);
      const unconstrainedValue: number = totalMaxLength / totalLength;
      onUpdateForce?.(Math.min(unconstrainedValue, 1));
    }
  }, [angle, isGrabbed, onUpdateAngle, onUpdateForce]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const onRelease = useCallback(():void => {
    // update internal state
    setIsGrabbed(false);
    // update template
    document.body.classList.remove('analog-stick-grabbed');
    // animate back to origin position
    gsap.to(graphic.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
    gsap.to(graphicEdge.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
    // emit event
    onReleased?.();
  }, [onReleased]);

  useGlobalRelease(isGrabbed, onRelease);

  useEffect(() => {
    if (bounds.current) {
      // get radius of boundary circle
      const radius: number = (bounds.current.width / 2) * 0.8;
      // get the furthest point that the stick can move along current angle
      const maxDistance: Coord = getPointAlongAngle(0, 0, angle, radius);
      // get new axis rotation values based on angle and force
      const rotation: Coord = {
        y: (Math.abs(maxDistance.x * force) / radius) * (angle < -90 || angle > 90 ? -1 : 1),
        x: (Math.abs(maxDistance.y * force) / radius) * (angle > 0 ? -1 : 1),
      };
      // translate and rotate the graphics to the new positions
      gsap.set(graphic.current, {
        x: maxDistance.x * force,
        y: maxDistance.y * force,
        rotateX: maxRotation.current * rotation.x,
        rotateY: maxRotation.current * rotation.y,
      });
      gsap.set(graphicEdge.current, {
        x: maxDistance.x * force * 0.9,
        y: maxDistance.y * force * 0.9,
        rotateX: (maxRotation.current * 0.9) * rotation.x,
        rotateY: (maxRotation.current * 0.9) * rotation.y,
      });
    }
  }, [angle, force]);

  // event handlers

  function onMouseDown(e:MouseEvent):void {
    if (root.current) {
      // update internal state
      setIsGrabbed(true);
      bounds.current = root.current.getBoundingClientRect();
      grabOrigin.current.x = e.clientX;
      grabOrigin.current.y = e.clientY;
      // update template
      document.body.classList.add('analog-stick-grabbed');
      // emit event
      onGrabbed?.();
    }
  }

  // template

  return (
    <span
      ref={root}
      className={rootClasses}
      onMouseDown={onMouseDown}
    >
      <img
        ref={graphic}
        src={graphicSrc}
        alt="Analog stick"
        className={styles.graphic}
        draggable="false"
      />
      {/* second graphic used to create a 3D effect by translating/rotating slightly less than the main graphic */}
      <img
        ref={graphicEdge}
        src={graphicEdgeSrc}
        role="presentation"
        alt=""
        className={styles['graphic-edge']}
        draggable="false"
      />
    </span>
  );
}
