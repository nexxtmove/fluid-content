export function getContentStyle(width, scale) {
  return {
    width: `${width}px`,
    height: `${100 / scale}%`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  }
}

export function getContentWidth(bases, containerWidth) {
  const isBasesAscending = bases.length >= 2 && bases[0] < bases[1]

  return bases.reduce((width, breakpoint) => {
    const isReached = isBasesAscending
      ? containerWidth >= breakpoint
      : containerWidth <= breakpoint

    return isReached ? breakpoint : width
  }, bases[0])
}
