import { useRef, useState, useEffect } from 'react'

export default function ({ base, children }) {
  const bases = Array.isArray(base) ? base : [base]
  const isBasesAscending = bases.length >= 2 && bases[0] < bases[1]

  const [contentWidth, setContentWidth] = useState(bases[0])
  const [contentScale, setContentScale] = useState(1)
  const containerRef = useRef(null)

  const contentStyle = {
    width: `${contentWidth}px`,
    height: `${100 / contentScale}%`,
    transform: `scale(${contentScale})`,
    transformOrigin: 'top left',
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = containerRef.current.offsetWidth

      const contentWidth = bases.reduce((width, breakpoint) => {
        const isReached = isBasesAscending
          ? containerWidth >= breakpoint
          : containerWidth <= breakpoint

        return isReached ? breakpoint : width
      }, bases[0])

      setContentWidth(contentWidth)
      setContentScale(containerWidth / contentWidth)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [base])

  return (
    <div ref={containerRef}>
      <div style={contentStyle}>{children}</div>
    </div>
  )
}
