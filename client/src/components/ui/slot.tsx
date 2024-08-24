import * as React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLDivElement, SlotProps>(
  ({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
);

Slot.displayName = "Slot";

export { Slot };