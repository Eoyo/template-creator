import path from "path"

export const paths = {
  root: (p: string) => path.join(__dirname, "../../", p),
}
