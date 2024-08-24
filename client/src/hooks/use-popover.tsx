import { MutableRefObject, useEffect, useRef, useState } from "react";

interface usePopoverReturn {
  isOpen: boolean;
  popoverRef: MutableRefObject<HTMLElement | null>;
  triggerRef: MutableRefObject<HTMLElement | null>;
  togglePopover: () => void;
  closePopover: () => void;
}

function usePopover(): usePopoverReturn {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const togglePopover = () => setIsOpen((prev) => !prev);
  const closePopover = () => setIsOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        closePopover();
      }
    }

      if(isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      } else {
        document.removeEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown",handleClickOutside)
      }
  }, [isOpen]);

  return {
    isOpen,
    popoverRef,
    triggerRef,
    togglePopover,
    closePopover,
  }
}

export default usePopover