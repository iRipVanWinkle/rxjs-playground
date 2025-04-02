import clsx from "clsx";
import { NodeProps, useNodeId } from "reactflow";

import styles from './Node.module.css';

export function FromEventNode(props: NodeProps) {
  const { selected } = props;

  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <div>From Event Node {useNodeId()}</div>
    </div>
  );

}
