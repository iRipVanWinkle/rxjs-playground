import { useNodeId } from 'reactflow';

import styles from '../Node.module.css';

type NodeHeaderProps = {
    id: string,
    name: string
}

export function NodeHeader({id, name}: NodeHeaderProps) {
    return <div className={styles['node-header']}>
        <div>#{id}</div>
        <div>{name}</div>
    </div>
}