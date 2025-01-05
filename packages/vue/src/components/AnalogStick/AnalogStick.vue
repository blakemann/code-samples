<template>
  <div
    ref="root"
    :class="{
      'root': true,
      'root--grabbed': isGrabbed,
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
  </div>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { useGlobalRelease } from '@/composables';
  import { getAngle, getPointAlongAngle } from '@/utilities/trigonometry';

  const angle = defineModel('angle', {
    type: Number,
    default: 0,
  });
  const force = defineModel('force', {
    type: Number,
    default: 0,
  });

  const emit = defineEmits([
    'grabbed',
    'released',
  ]);

  // data

  const root = ref(null);
  const graphic = ref(null);
  const graphicEdge = ref(null);
  const isGrabbed = ref(false);
  const grabOrigin = { x: 0, y: 0 };
  const maxRotation = 40; // degrees
  let bounds = undefined;

  // lifecycle

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onMouseMove);
  });

  watch(angle, updateGraphics);
  watch(force, updateGraphics);

  // methods

  function onMouseDown(e) {
    isGrabbed.value = true;
    document.body.classList.add('analog-stick-grabbed');
    bounds = root.value.getBoundingClientRect();
    grabOrigin.x = e.clientX;
    grabOrigin.y = e.clientY;
    emit('grabbed');
  }

  function onMouseMove(e) {
    if (isGrabbed.value) {
      // get radius of boundary circle
      const radius = (bounds.width / 2) * 0.8;
      // get the current x/y distance that the mouse has moved
      const distance = {
        x: e.clientX - grabOrigin.x,
        y: e.clientY - grabOrigin.y,
      };
      // get angle between mouse start and current positions
      angle.value = getAngle(grabOrigin.x, grabOrigin.y, e.clientX, e.clientY);
      // get the furthest point that the stick can move along current angle
      const maxDistance = getPointAlongAngle(0, 0, angle.value, radius);
      // get a value between 0 and 1 representing how far the stick has moved between center and boundary
      const totalLength = Math.abs(maxDistance.x) + Math.abs(maxDistance.y);
      const totalMaxLength = Math.abs(distance.x) + Math.abs(distance.y);
      const unconstrainedValue = totalMaxLength / totalLength;
      force.value = Math.min(unconstrainedValue, 1);
    }
  }

  function updateGraphics() {
    // get radius of boundary circle
    const radius = (bounds.width / 2) * 0.8;
    // get the furthest point that the stick can move along current angle
    const maxDistance = getPointAlongAngle(0, 0, angle.value, radius);
    // translate and rotate the graphics to the new positions
    const rotation = {
      y: (Math.abs(maxDistance.x * force.value) / radius) * (angle.value < -90 || angle.value > 90 ? -1 : 1),
      x: (Math.abs(maxDistance.y * force.value) / radius) * (angle.value > 0 ? -1 : 1),
    };
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

  function onRelease() {
    isGrabbed.value = false;
    emit('released');
    document.body.classList.remove('analog-stick-grabbed');
    gsap.to(graphic.value, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
    gsap.to(graphicEdge.value, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.25, ease: 'back.out' });
  }

  useGlobalRelease(isGrabbed, onRelease);
</script>

<style lang="scss" scoped>
  @use '@/styles/core' as *;

  .root {
    position: relative;
    border-radius: 50%;
    cursor: grab;
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
