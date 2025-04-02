import { useNodeId } from 'reactflow';

import styles from '../Node.module.css';
import { Button, SpaceBetween } from '@cloudscape-design/components';

type NodeFooterProps = {
    id: string,
    name: string,
    type: string
}

export function NodeFooter({ id, name, type }: NodeFooterProps) {
    return <div className={styles['node-footer']}>
        <div>
            {type === 'subscriberNode' && <Button iconName="play" iconAlt="Run" variant="icon" />}
        </div>
        <div className={styles['node-footer-tools']}>
            <Button iconName="edit" iconAlt="Edit" variant="icon" />
            <Button iconName="remove" iconAlt="Remove" variant="icon" />
        </div>
    </div>
}