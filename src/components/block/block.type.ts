interface IBlockCompProps {
  [key:string]: any,
  events?: {[key:string]: <T, M>(that: T, e: M) => void},
  class?: string
}

export {IBlockCompProps};
