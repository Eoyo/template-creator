export function deepMerge(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const c: any[] = []
    const bLen = b.length
    const aLen = a.length
    a.forEach((one, index) => {
      if (index < bLen) {
        c.push(...deepMerge(one, b[index]))
      } else {
        c.push(one)
      }
    })
    for (let i = aLen; i < bLen; i += 1) {
      c.push(b[i])
    }
    return [[...new Set(c)]]
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const obj: any = { ...a }
    const bKeys = Object.keys(b)
    bKeys.forEach((one) => {
      ;[obj[one]] = deepMerge(obj[one], b[one])
    })
    return [obj]
  }
  return [b, a]
}
