import { IBlockCompProps } from "../block/block.type";

interface IInputCompProps extends IBlockCompProps {
    type: string,
    placeholder?: string,
    name?: string,
    validation?: {
        text: string,
        fn: (val: string | undefined) => boolean
    }
}

export {IInputCompProps}