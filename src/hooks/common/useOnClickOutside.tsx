import type { RefObject } from 'react';
import { useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  togglerRef?: RefObject<T>,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const toggler = togglerRef?.current;

      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        toggler?.contains((event?.target as Node) || null)
      ) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, togglerRef, handler]);
};
