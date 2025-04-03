import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "@xyflow/react";

import styles from './Node.module.css';
import { Observable, timer } from "rxjs";
// import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";
import { BaseNode } from "@/components/flow/BaseNode";
import { NodeHeader } from "./parts/NodeHeader";


export function TimerNode(props: NodeProps) {
  const { id, type, selected, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="timer()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>
      
      <Handle type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}

let i = 0;

TimerNode.handler = (observable: Observable<unknown>): Observable<unknown> => {
  i++;
  return timer(0, i % 2 ? 1000 : 1750);
}
