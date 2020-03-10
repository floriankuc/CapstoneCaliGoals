export function capitalise(string) {
  return string
    .split(' ')
    .map(el => el[0].toUpperCase() + el.slice(1, el.length))
    .join(' ')
}
