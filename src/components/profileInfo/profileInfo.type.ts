import { IBlockCompProps } from "../block/block.type";

interface IProfileInfoCompProps extends IBlockCompProps {
  items: IProfileInfoCompPropsItem[]
}
interface IProfileInfoCompPropsItem extends IBlockCompProps {
  name: string,
  value: string
}

export {
  IProfileInfoCompProps,
  IProfileInfoCompPropsItem
}