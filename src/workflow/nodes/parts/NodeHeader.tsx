type NodeHeaderProps = {
    id: string,
    name: string
}

export function NodeHeader({id, name}: NodeHeaderProps) {
    return <div className={'flex justify-between p-1'}>
      <div>{name}</div>
      <div className='text-sm'>#{id}</div>
    </div>
}