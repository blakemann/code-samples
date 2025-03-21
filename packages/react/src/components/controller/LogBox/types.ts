import type { Input } from '@/shared/utilities/constants';
import type { LogItemData } from '@/react/components/LogItem';

export type LogEntry = {
  timestamp: number,
  input: Input,
  data: LogItemData,
}
