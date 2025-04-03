import styles from '../Node.module.css';
import { Button } from '@/components/ui/button';
import { Pencil, Play, Trash } from 'lucide-react';

type NodeFooterProps = {
    id: string,
    type: string,
    onRun?: () => void,
    onStop?: () => void
} 

export function NodeFooter({ id, type, onRun, onStop }: NodeFooterProps) {
    return <div className={'rounded-b-md bg-gray-100 p-1 flex justify-between -mx-3 -mb-2 border-b'}>
        {/* <div> 
            {type === 'subscriberNode' && <Button variant="outline" size="sm" onClick={onRun}><Play /></Button>}
        </div>
        <div className={styles['node-footer-tools']}>
          <Button variant="outline" size="sm"><Pencil /></Button>
          <Button variant="outline" size="sm"><Trash /></Button>
        </div> */}
    </div>
}
