export const MARKERS = {
  Pipe: 'pipe',
  Params: 'params',
}

export function Markers() {
  return <svg style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <marker
        id={MARKERS.Pipe}
        markerWidth="16"
        markerHeight="10"
        viewBox="-10 -10 20 20"
        markerUnits="strokeWidth"
        orient="auto-start-reverse"
        refX="0"
        refY="0"
      >
        <polyline
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          points="-5,-4 0,0 -5,4"
          style={{
            stroke: '#424650',
            strokeWidth: 1,
          }}
        ></polyline>
      </marker>
      <marker
        id={MARKERS.Params}
        markerWidth="14"
        markerHeight="14"
        viewBox="-10 -10 20 20"
        markerUnits="strokeWidth"
        orient="auto-start-reverse"
        refX="0"
        refY="0"
      >
        <circle cx="0" cy="0" r="3" style={{
          stroke: '#424650',
          strokeWidth: 1,
        }} />
      </marker>
    </defs>
  </svg>
}