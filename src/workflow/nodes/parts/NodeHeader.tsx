import { NodeHeaderActions, NodeHeaderDeleteAction, NodeHeaderIcon, NodeHeaderTitle, NodeHeader as BaseNodeHeader, NodeHeaderAction } from "@/components/flow/NodeHeader"
import { Button } from "@/components/ui/button"
import { Pencil, Play, Rocket } from "lucide-react"

type NodeHeaderProps = {
    id: string,
    name: string,
    type?: string,
    onEdit?: () => void
    onRun?: () => void
}

export function NodeHeader({id, name, type, onRun, onEdit}: NodeHeaderProps) {
    // return <div className={'flex justify-between p-1'}>
    //   <div>{name}</div>
    //   <div className='text-sm'>#{id}</div>
    // </div>

    return <BaseNodeHeader className="-mx-3 -mt-2 border-b">
    {/* <NodeHeaderIcon>
      <Rocket />
    </NodeHeaderIcon> */}
    <NodeHeaderTitle>{ name }</NodeHeaderTitle>
    <NodeHeaderActions>
      {type === 'subscriberNode' && <Button variant="outline" size="sm" onClick={onRun}><Play /></Button>}

      <NodeHeaderAction onClick={onEdit} variant="ghost" label="Delete node">
        <Pencil />
      </NodeHeaderAction>
      <NodeHeaderDeleteAction />
    </NodeHeaderActions>
  </BaseNodeHeader>
}