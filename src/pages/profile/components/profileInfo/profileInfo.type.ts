import { IBlockCompProps } from "../../../../components/block/block.type";

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