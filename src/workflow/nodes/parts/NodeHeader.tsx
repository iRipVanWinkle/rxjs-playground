import { NodeHeaderActions, NodeHeaderTitle, NodeHeader as BaseNodeHeader } from "@/components/flow/NodeHeader"
import { Button } from "@/components/ui/button"
import { Play, StopCircle } from "lucide-react"
import { ReactNode } from "react"
import { EditPopover } from "./EditPopover"
import { DeleteAction } from "./DeleteAction"
import { useWorkContext } from "@/context/WorkContext"

type NodeHeaderProps = {
  id: string,
  name: string,
  editForm?: ReactNode
  onRun?: () => void
  onStop?: () => void
}

export function NodeHeader({ id, name, onRun, onStop, editForm }: NodeHeaderProps) {
  const { isRunning } = useWorkContext();

  const canRun = onRun && !isRunning;
  const canStop = onStop && isRunning;

  return <BaseNodeHeader className="-mx-3 -mt-2 border-b">
    <NodeHeaderTitle>{name}</NodeHeaderTitle>
    <NodeHeaderActions>
      {canRun && <Button variant="outline" size="sm" onClick={onRun}><Play /></Button>}
      {canStop && <Button variant="outline" size="sm" onClick={onStop}><StopCircle /></Button>}

      {editForm && <EditPopover>{ editForm }</EditPopover>}
      <DeleteAction />
    </NodeHeaderActions>
  </BaseNodeHeader>
}
