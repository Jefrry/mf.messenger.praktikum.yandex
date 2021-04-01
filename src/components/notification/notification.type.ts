import {IBlockCompProps} from '../block/block.type';

interface INotificationProps extends IBlockCompProps {
  text: string,
  type: 'success' | 'error',
  time?: number
}

export {INotificationProps};
