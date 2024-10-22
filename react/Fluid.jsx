import { useRef, useState, useEffect } from 'react'
import { getContentStyle, getContentWidth } from '../common/utils'

export default function ({ base, children }) {
  const bases = Array.isArray(base) ? base : [base]

  const [contentWidth, setContentWidth] = useState(bases[0])
  const [contentScale, setContentScale] = useState(1)
  const containerRef = useRef(null)

  const contentStyle = getContentStyle(contentWidth, contentScale)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = containerRef.current.offsetWidth
      const contentWidth = getContentWidth(bases, containerWidth)

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
