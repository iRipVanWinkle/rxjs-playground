import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "reactflow";

import styles from './Node.module.css';
import { combineLatest, Observable } from "rxjs";

export function CombineLatestNode(props: NodeProps) {
  const { selected } = props;
  
  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <div>Combine Latest {useNodeId()}</div>

      <Handle type="target" position={Position.Top}></Handle>
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );

}

CombineLatestNode.handler = (observables: Observable<unknown>[]): Observable<unknown> => {
  return combineLatest(observables);
}