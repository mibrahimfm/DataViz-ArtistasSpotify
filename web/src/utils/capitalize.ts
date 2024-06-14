export function capitalize(str: string) {
  if (!str || typeof str !== 'string') {
    return ''
  }
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}