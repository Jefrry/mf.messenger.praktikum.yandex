import {IBlockCompProps} from '../block/block.type';

interface IPopupCompProps extends IBlockCompProps {
  items: IPopupCompPropsItem[]
}
interface IPopupCompPropsItem extends IBlockCompProps {
  text: string,
  icon: string
}

export {
	IPopupCompProps,
	IPopupCompPropsItem
};
