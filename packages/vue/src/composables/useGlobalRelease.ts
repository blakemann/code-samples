import type { Ref } from 'vue';
import { onMounted, onBeforeUnmount } from 'vue';

export default function useGlobalRelease(conditionRef:Ref, callback:Function):void {
  onMounted(():void => {
    document.addEventListener('mouseup', onRelease);
    document.addEventListener('visibilitychange', onVisibilityChange);
  });

  onBeforeUnmount(():void => {
    document.removeEventListener('mouseup', onRelease);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  function onRelease():void {
    if (conditionRef.value) {
      callback();
    }
  }

  function onVisibilityChange():void {
    if (document.hidden) {
      onRelease();
    }
  }
}
