declare module "keycode" {
  const keycode: (keycode: Event | string | number) => string | number
  export default keycode
}

declare module "*" {
  let s: string
  export default s
}

