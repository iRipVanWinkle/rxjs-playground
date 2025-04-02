import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "reactflow";

import styles from './Node.module.css';
import { Observable, timer } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";

export function TimerNode(props: NodeProps) {
  const { id, selected } = props;
  
  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <NodeHeader id={id} name="timer()"></NodeHeader>

      <NodeContent id={id} name="timer()"></NodeContent>

      <NodeFooter id={id} name="timer()"></NodeFooter>
      
      <Handle type="source" position={Position.Right} ></Handle>
    </div>
  );
}

TimerNode.handler = (observable: Observable<unknown>): Observable<unknown> => {
  return timer(0, 1000);
}
