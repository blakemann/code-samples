import { useEffect } from 'react';

export default function useGlobalRelease(condition:boolean, callback:() => void):void {
  useEffect(() => {
    function onRelease():void {
      if (condition) {
        callback();
      }
    }

    function onVisibilityChange():void {
      if (document.hidden) {
        onRelease();
      }
    }

    document.addEventListener('mouseup', onRelease);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('mouseup', onRelease);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    }
  }, [condition, callback]);
}
