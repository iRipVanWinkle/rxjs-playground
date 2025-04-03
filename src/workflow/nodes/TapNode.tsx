import clsx from "clsx";
import { Handle, NodeProps, Position, useNodeId } from "@xyflow/react";

import styles from './Node.module.css';
import { Observable, tap } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

export function TapNode(props: NodeProps) {
  const { id, data, type, selected } = props;

  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <NodeContainer>
      <NodeHeader id={id} name="tap()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}

TapNode.handler = (observable: Observable<unknown>): Observable<unknown> => {
  return observable.pipe(
    tap((value) => {
      // console.log('Tap Node Value:', value);
    })
  );
}
