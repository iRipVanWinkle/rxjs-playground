import { NodeHeaderActions, NodeHeaderDeleteAction, NodeHeaderTitle, NodeHeader as BaseNodeHeader, NodeHeaderAction } from "@/components/flow/NodeHeader"
import { Button } from "@/components/ui/button"
import { Pencil, Play } from "lucide-react"
import Subscriber from "@/operations/Subscriber"
import { ReactNode } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type NodeHeaderProps = {
  id: string,
  name: string,
  type?: string,
  edit?: boolean,
  editForm?: ReactNode
  onEdit?: () => void
  onRun?: () => void
}

export function NodeHeader({ id, name, type, edit, onRun, onEdit, editForm }: NodeHeaderProps) {
  // return <div className={'flex justify-between p-1'}>
  //   <div>{name}</div>
  //   <div className='text-sm'>#{id}</div>
  // </div>

  return <BaseNodeHeader className="-mx-3 -mt-2 border-b">
    {/* <NodeHeaderIcon>
      <Rocket />
    </NodeHeaderIcon> */}
    <NodeHeaderTitle>{name}</NodeHeaderTitle>
    <NodeHeaderActions>
      {type === Subscriber.key && <Button variant="outline" size="sm" onClick={onRun}><Play /></Button>}

      {edit &&

        <Popover>
          <PopoverTrigger asChild>
            <NodeHeaderAction variant="ghost" label="Delete node">
              <Pencil />
            </NodeHeaderAction>
          </PopoverTrigger>
          <PopoverContent>
            {editForm}
          </PopoverContent>
        </Popover>

        // </SheetTrigger>

      }
      <NodeHeaderDeleteAction />
    </NodeHeaderActions>
  </BaseNodeHeader>
}
