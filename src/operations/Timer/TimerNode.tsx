import { Handle, NodeProps, Position, useNodesData } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TimerForm from "./TimerForm";

export default function TimerNode(props: NodeProps) {
  const { id, type, data } = props;

  const nodeData = useNodesData(id);

  return (
    <NodeContainer {...props}>
      {/* <Sheet> */}
      <NodeHeader id={id} name="timer()" edit editForm={<TimerForm />}></NodeHeader>

      <NodeContent value={data?.value}>
        
      </NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      {/* <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure? {id} </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet> */}
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>



    </NodeContainer>
  );
}
