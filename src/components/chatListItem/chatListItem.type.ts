import { IBlockCompProps } from "../block/block.type";

interface IChatListItemCompProps extends IBlockCompProps {
    name: string,
    avatar: string,
    message: string,
    date: string
}

export {IChatListItemCompProps}