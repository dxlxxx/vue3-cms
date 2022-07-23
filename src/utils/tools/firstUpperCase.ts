export default function firstUpperCase(value: string) {
  const characters = [...value]
  characters[0] = characters[0].toUpperCase()
  const newValue = characters.join('')
  return newValue
}
