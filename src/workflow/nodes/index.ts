
import { NodeTypes } from '@xyflow/react';
import Timer from '@/operations/Timer';
import Subscriber from '@/operations/Subscriber';
import TakeUntil from '@/operations/TakeUntil';
import { Operation } from '../../models/OperationFunction';
import Interval from '@/operations/Interval';
import Empty from '@/operations/Empty';
import IsEmpty from '@/operations/IsEmpty';
import Range from '@/operations/Range';
import Delay from '@/operations/Delay';
import Zip from '@/operations/Zip';
import Take from '@/operations/Take';
import Buffer from '@/operations/Buffer';
import GroupBy from '@/operations/GroupBy';
import MergeMap from '@/operations/MergeMap';


export const Operations: Record<string, Operation> = [
  Timer,
  Subscriber,
  TakeUntil,
  Interval,
  Empty,
  IsEmpty,
  Range,
  Delay,
  Zip,
  Take,
  Buffer,
  GroupBy,
  MergeMap
].reduce((acc, operation) => ({ ...acc, [operation.key]: operation }), {});

export const nodeTypes = Object.entries(Operations).reduce<NodeTypes>((acc, [key, operation]) => ({ ...acc, [key]: operation.Node }), {});

export const OperationsByGroup = Object.values(Operations).reduce<Record<string, Operation[]>>(
  (acc, operation) => ({ ...acc, [operation.group]: [...(acc[operation.group] ?? []), operation] }),
  {}
);

