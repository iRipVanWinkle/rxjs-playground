
import { NodeTypes } from '@xyflow/react';
import Timer from '@/operations/Timer';
import Subscriber from '@/operations/Subscriber';
import TakeUntil from '@/operations/TakeUntil';
import { Operation } from '../../models/OperationFunction';
import Interval from '@/operations/Interval';

export const Operations: Record<string, Operation> = [
  Timer,
  Subscriber,
  TakeUntil,
  Interval
].reduce((acc, operation) => ({ ...acc, [operation.key]: operation }), {});

export const nodeTypes = Object.entries(Operations).reduce<NodeTypes>((acc, [key, operation]) => ({ ...acc, [key]: operation.Node }), {});

export const OperationsByGroup = Object.values(Operations).reduce<Record<string, Operation[]>>(
  (acc, operation) => ({ ...acc, [operation.group]: [...(acc[operation.group] ?? []), operation] }),
  {}
);

// export const nodeTypes = ([
//   SubscriberNode,
//   CombineLatestNode,
//   RaceNode,
//   ZipNode,
//   TakeUntilNode,
//   // FromEventNode,
//   TimerNode,
//   TapNode
// ]).reduce<NodeTypes>((acc, node) => ({ ...acc, [(node as OperationNode).key]: node }), {});
