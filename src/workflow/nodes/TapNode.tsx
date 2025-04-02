import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "reactflow";

import styles from './Node.module.css';
import { Observable, tap } from "rxjs";

export function TapNode(props: NodeProps) {
  const { selected } = props;

  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <div>Tap Node {useNodeId()}</div>

      <Handle type="target" position={Position.Left} ></Handle>
      <Handle type="source" position={Position.Right} ></Handle>
    </div>
  );
}

TapNode.handler = (observable: Observable<unknown>): Observable<unknown> => {
  return observable.pipe(
    tap((value) => {
      console.log('Tap Node Value:', value);
    })
  );
}
