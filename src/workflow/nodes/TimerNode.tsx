import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "reactflow";

import styles from './Node.module.css';
import { Observable, timer } from "rxjs";

export function TimerNode(props: NodeProps) {
  const { selected } = props;
  
  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <div>Timer Node {useNodeId()}</div>

      <Handle type="source" position={Position.Right} ></Handle>
    </div>
  );
}

TimerNode.handler = (observable: Observable<unknown>): Observable<unknown> => {
  return timer(0, 1000);
}
