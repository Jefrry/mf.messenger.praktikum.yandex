interface IBlockCompProps {
  [key:string]: any, 
  events?: {[key:string]: () => void},
  class?: string
}

export {IBlockCompProps}