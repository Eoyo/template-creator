// 去掉相同的头部
export const cutHead = (head: string, srcStr: string) => {
  const cutHeadStr = srcStr.slice(0, head.length)
  if (head === cutHeadStr) {
    return srcStr.slice(head.length - 1)
  }
  return srcStr
}
