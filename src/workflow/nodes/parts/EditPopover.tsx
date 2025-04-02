import { NodeHeaderAction } from "@/components/flow/NodeHeader"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useWorkContext } from "@/context/WorkContext"
import { Pencil } from "lucide-react"
import { createContext, ReactNode, use, useMemo, useState } from "react"

type EditPopoverProps = {
  children?: ReactNode
}

interface EditPopoverContextType {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const EditPopoverContext = createContext<EditPopoverContextType | undefined>(undefined);

export const useEditPopoverContext = () => {
  const context = use(EditPopoverContext);
  if (!context) throw new Error("usePopoverContext must be used within EditPopover");
  return context;
};

export function EditPopover({ children }: EditPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { isRunning } = useWorkContext();

  const context = useMemo<EditPopoverContextType>(() => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(isOpen => !isOpen)
  }), [])

  return (<EditPopoverContext value={context}>
    <Popover open={isOpen} onOpenChange={setIsOpen}>
    <PopoverTrigger asChild>
      <NodeHeaderAction variant="ghost" label="Edit node" disabled={isRunning}>
        <Pencil />
      </NodeHeaderAction>
    </PopoverTrigger>
    <PopoverContent>
      {children}
    </PopoverContent>
  </Popover>
  </EditPopoverContext>);
}
