import type { Ref } from 'vue';
import { uniqueId } from 'lodash-es';
import { ref } from 'vue';

export default function useUniqueId(prefix:string = 'uid'):Ref {
  return ref(uniqueId(`${prefix}-`));
}
