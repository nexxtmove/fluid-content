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

  return bases.reduce((width, breakpoint, i) => {
    const isReached = isBasesAscending
      ? containerWidth >= breakpoint
      : containerWidth <= breakpoint

    if (!isReached) {
      return width
    }

    const nextBreakpoint = bases[i + 1]
    if (nextBreakpoint === Infinity) {
      // When passing `Infinity` as next value, stop scaling from this breakpoint.
      return containerWidth
    }

    return breakpoint
  }, bases[0])
}
