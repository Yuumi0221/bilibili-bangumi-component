export function serializeSearchParams(searchParams: object) {
  return Object.entries(searchParams)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export function parseSearchParams(url: URL) {
  return Object.fromEntries(Array.from(url.searchParams.entries()).filter(([, value]) => !!value))
}

// 数字转中文
export function numberToZh(num: number) {
  const numString = num.toString()
  if (numString.length < 5)
    return numString

  if (numString.length < 9) {
    const displayStr = numString.slice(0, -3)
    const length = displayStr.length
    const sub = displayStr[length - 1] === '0' ? '' : `.${displayStr[length - 1]}`
    return `${displayStr.slice(0, length - 1)}${sub}万`
  }

  const displayStr = numString.slice(0, -7)
  const length = displayStr.length
  const sub = displayStr[length - 1] === '0' ? '' : `.${displayStr[length - 1]}`
  return `${displayStr.slice(0, length - 1)}${sub}亿`
}

export function formatUrl(url: URL) {
  const pathname = url.pathname === '/' ? '' : url.pathname
  return `${url.origin}${pathname}`
}
