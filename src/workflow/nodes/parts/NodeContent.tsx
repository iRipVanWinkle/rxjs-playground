import { Label } from '@/components/ui/label';
import styles from '../Node.module.css';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

type NodeContentProps = {
  value?: unknown
  children?: ReactNode
}

export function NodeContent({ children }: NodeContentProps) {
  return <div>
    {children}
  </div>
}