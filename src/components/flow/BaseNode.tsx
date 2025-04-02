import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type BaseNodeProps = HTMLAttributes<HTMLDivElement> & { selected?: boolean }

export const BaseNode = forwardRef<HTMLDivElement, BaseNodeProps>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-md border bg-card p-5 text-card-foreground",
      className,
      selected ? "border-muted-foreground shadow-lg" : "",
      "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  />
));

BaseNode.displayName = "BaseNode";
