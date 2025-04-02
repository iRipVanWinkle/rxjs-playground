import { useNodeId } from 'reactflow';

import styles from '../Node.module.css';

type NodeContentProps = {
    id: string,
    name: string
}

export function NodeContent({id, name}: NodeContentProps) {
    return <div className={styles['node-content']}>
        
    </div>
}