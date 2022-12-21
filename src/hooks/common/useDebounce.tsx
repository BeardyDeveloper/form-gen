import debounceFunction from 'lodash/debounce';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';

export enum DebounceActionType {
  Default,
  Search,
}

interface DebounceData {
  waitInMillisecond: number;
  options?: any;
}

interface UseDebounceProps {
  action: (value?: any) => void;
  data: DebounceData;
}

export const useDebounce = (props: UseDebounceProps) => {
  const { action, data } = props;

  const { waitInMillisecond = 300, options = { leading: true } } = data;

  return useCallback(
    debounceFunction(
      (e: MouseEvent<HTMLElement>) => {
        e.persist();
        if (e != null) {
          action(e);
        }
      },
      waitInMillisecond,
      options,
    ),
    [],
  );
};
