<template>
  <span
    ref="root"
    :class="{
      'c-analog-stick': true,
      'c-analog-stick--grabbed': isGrabbed,
    }"
    @mousedown="onMouseDown"
  >
    <img
      ref="graphic"
      src="./assets/analog-stick.png"
      alt="Analog stick"
      class="graphic"
      draggable="false"
    >
    <!-- second graphic used to create a 3D effect by translating/rotating slightly less than the main graphic -->
    <img
      ref="graphicEdge"
      src="./assets/analog-stick-edge.png"
      role="presentation"
      alt=""
      class="graphic-edge"
      draggable="false"
    >
  </span>
</template>

<script lang="ts">
  import { gsap } from 'gsap';
  import { ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue';
  import { useGlobalRelease } from '@/vue/composables';
  import { getAngle, getPointAlongAngle } from '@/vue/utilities/trigonometry';

  export enum ComponentEvent {
    Grabbed = 'grabbed',
    Released = 'released',
  }

  type Coord = {
    x: number,
    y: number,
  }
</script>

<script setup lang="ts">
  // defines

  const angle = defineModel<number>('angle', {
    default: 0,
  });
  const force = defineModel<number>('force', {
    default: 0,
  });

  const emit:Function = defineEmits(Object.values(ComponentEvent));

  // data

  const root = useTemplateRef<HTMLSpanElement>('root');
  const graphic = useTemplateRef<HTMLImageElement>('graphic');
  const graphicEdge = useTemplateRef<HTMLImageElement>('graphicEdge');
  const isGrabbed = ref<boolean>(false);
  const grabOrigin:Coord = { x: 0, y: 0 };
  const maxRotation:number = 40; // degrees
  let bounds:DOMRect|null = null;

  // lifecycle

  onMounted(():void => {
    document.addEventListener('mousemove', onMouseMove);
  });

  onBeforeUnmount(():void => {
    document.removeEventListener('mousemove', onMouseMove);
  });

  watch(angle, updateGraphics);
  watch(force, updateGraphics);

  // methods

  function onMouseDown(e:MouseEvent):void {
    if (root.value) {
      // update internal state
      isGrabbed.value = true;
      bounds = root.value.getBoundingClientRect();
      grabOrigin.x = e.clientX;
      grabOrigin.y = e.clientY;
      // update template
      document.body.classList.add('analog-stick-grabbed');
      // emit event
      emit(ComponentEvent.Grabbed);
    }
  }

  function onMouseMove(e:MouseEvent):void {
    if (isGrabbed.value && bounds) {
      // get radius of boundary circle
      const radius:number = (bounds.width / 2) * 0.8;
      // get the current x/y distance that the mouse has moved
      const distance:Coord = {
        x: e.clientX - grabOrigin.x,
        y: e.clientY - grabOrigin.y,
      };
      // get angle between mouse start and current positions
      angle.value = getAngle(grabOrigin.x, grabOrigin.y, e.clientX, e.clientY);
      // get the furthest point that the stick can move along current angle
      const maxDistance:Coord = getPointAlongAngle(0, 0, angle.value, radius);
      // get a value between 0 and 1 representing how far the stick has moved between center and boundary
      const totalLength:number = Math.abs(maxDistance.x) + Math.abs(maxDistance.y);
      const totalMaxLength:number = Math.abs(distance.x) + Math.abs(distance.y);
      const unconstrainedValue:number = totalMaxLength / totalLength;
      force.value = Math.min(unconstrainedValue, 1);
    }
  }

  function updateGraphics():void {
    if (bounds) {
      // get radius of boundary circle
      const radius: number = (bounds.width / 2) * 0.8;
      // get the furthest point that the stick can move along current angle
      const maxDistance: Coord = getPointAlongAngle(0, 0, angle.value, radius);
      // get new axis rotation values based on angle and force
      const rotation: Coord = {
        y: (Math.abs(maxDistance.x * force.value) / radius) * (angle.value < -90 || angle.value > 90 ? -1 : 1),
        x: (Math.abs(maxDistance.y * force.value) / radius) * (angle.value > 0 ? -1 : 1),
      };
      // translate and rotate the graphics to the new positions
      gsap.set(graphic.value, {
        x: maxDistance.x * force.value,
        y: maxDistance.y * force.value,
        rotateX: maxRotation * rotation.x,
        rotateY: maxRotation * rotation.y,
      });
      gsap.set(graphicEdge.value, {
        x: maxDistance.x * force.value * 0.9,
        y: maxDistance.y * force.value * 0.9,
        rotateX: (maxRotation * 0.9) * rotation.x,
        rotateY: (maxRotation * 0.9) * rotation.y,
      });
    }
  }

  function onRelease():void {
    // update internal state
    isGrabbed.value = false;
    // update template
    document.body.classList.remove('analog-stick-grabbed');
    // animate back to origin position
    gsap.to(graphic.value, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
    gsap.to(graphicEdge.value, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
    // emit event
    emit(ComponentEvent.Released);
  }

  useGlobalRelease(isGrabbed, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/vue/styles/core' as *;

  .c-analog-stick {
    position: relative;
    border-radius: 50%;
    cursor: grab;
    display: inline-block;
  }

  .graphic {
    width: 100%;
    vertical-align: middle;
    position: relative;
    z-index: 2;
  }

  .graphic-edge {
    width: 100%;
    position: absolute;
    inset: 0;
    z-index: 1;
  }
</style>

<style lang="scss">
  body.analog-stick-grabbed {
    &, * {
      cursor: grabbing !important;
    }
  }
</style>
