export function capitalize(str: string, replaceUndescores = false) {
  if (!str || typeof str !== 'string') {
    return ''
  }

  if (replaceUndescores) str = str.replaceAll('_', ' ')

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
