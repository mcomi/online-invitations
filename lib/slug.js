export function slugify(input) {
  return input
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos/diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function randomSuffix(length = 4) {
  return Math.random().toString(36).slice(2, 2 + length)
}
