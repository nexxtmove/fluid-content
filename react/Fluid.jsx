import { useRef, useState, useEffect } from 'react'

export default function ({ baseWidth, children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  const contentStyle = {
    width: `${baseWidth}px`,
    height: `${100 / scale}%`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / baseWidth)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [baseWidth])

  return (
    <div ref={containerRef}>
      <div style={contentStyle}>{children}</div>
    </div>
  )
}
