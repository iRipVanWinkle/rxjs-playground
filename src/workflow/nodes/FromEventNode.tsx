import clsx from "clsx";
import { NodeProps, useNodeId } from "@xyflow/react";

import styles from './Node.module.css';
import { NodeContainer } from "./parts/NodeContainer";

export function FromEventNode(props: NodeProps) {
  const { selected } = props;

  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <NodeContainer>
      <div>From Event Node {useNodeId()}</div>
    </NodeContainer>
  );

}
