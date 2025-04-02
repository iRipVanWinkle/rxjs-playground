import { ReactNode } from 'react';

type NodeContentProps = {
  value?: unknown
  children?: ReactNode
}

export function NodeContent({ children }: NodeContentProps) {
  return <div className='py-2'>
    {children}
  </div>
}