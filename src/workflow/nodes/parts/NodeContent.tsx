import styles from '../Node.module.css';

type NodeContentProps = {
  value?: unknown
}

export function NodeContent({ value }: NodeContentProps) {
  return <div className={styles['node-content']}>
    {value !== undefined ? <span>value: {JSON.stringify(value)}</span> : <span>&nbsp;</span>}
  </div>
}