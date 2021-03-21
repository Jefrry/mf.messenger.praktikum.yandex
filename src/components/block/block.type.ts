interface IBlockCompProps {
  [key:string]: any, 
  events?: {[key:string]: <T>(that: T) => void},
  class?: string
}

export {IBlockCompProps}