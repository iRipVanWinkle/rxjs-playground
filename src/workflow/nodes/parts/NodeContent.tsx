import { Label } from '@/components/ui/label';
import styles from '../Node.module.css';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

type NodeContentProps = {
  value?: unknown
  children?: ReactNode
}

export function NodeContent({ value, children }: NodeContentProps) {
  return <div>
    {children}
    {value !== undefined ? <span>value: {JSON.stringify(value)}</span> : <span>&nbsp;</span>}
  </div>
}