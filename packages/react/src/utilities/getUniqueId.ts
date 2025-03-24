import { uniqueId } from 'lodash-es';

export default function getUniqueId(prefix:string = 'uid'):string {
  return uniqueId(`${prefix}-`);
}
