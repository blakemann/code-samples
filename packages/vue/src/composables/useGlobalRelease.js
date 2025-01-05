import { onMounted, onBeforeUnmount } from 'vue';

export default function useGlobalRelease(conditionRef, callback) {
  onMounted(() => {
    document.addEventListener('mouseup', onRelease);
    document.addEventListener('visibilitychange', onVisibilityChange);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mouseup', onRelease);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  function onRelease() {
    if (conditionRef.value) {
      callback();
    }
  }

  function onVisibilityChange() {
    if (document.hidden) {
      onRelease();
    }
  }
}
