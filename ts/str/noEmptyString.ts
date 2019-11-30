export function noEmptyString(strArr: string[]) {
  return strArr.map(one => one.trim()).filter(one => !!one);
}
