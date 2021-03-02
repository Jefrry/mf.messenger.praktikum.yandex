// Не уверен, что правильно сваливать все типы в один файл,
// но я такое уже видел

interface IBlockCompProps {
    [key:string]: any, 
    events?: {[key:string]: () => void},
    class?: string
}
interface IValidationErrorCompProps extends IBlockCompProps {
    text: string
}
interface IProfileInfoCompProps extends IBlockCompProps {
    items: IProfileInfoCompPropsItem[]
}
interface IProfileInfoCompPropsItem extends IBlockCompProps {
    name: string,
    value: string
}
interface IPopupCompProps extends IBlockCompProps {
    items: IPopupCompPropsItem[]
}
interface IPopupCompPropsItem extends IBlockCompProps {
    text: string,
    icon: string
}
interface IModalCompProps extends IBlockCompProps {
    content: string
}
interface IMessageCompProps extends IBlockCompProps {
    content: string,
    time: string
}
interface IInputCompProps extends IBlockCompProps {
    type: string,
    placeholder: string,
    name: string,
    validation?: {
        text: string,
        fn: (val: string | undefined) => boolean
    }
}
interface IChatListItemCompProps extends IBlockCompProps {
    name: string,
    avatar: string,
    message: string,
    date: string
}
interface IButtonCompProps extends IBlockCompProps {
    text: string
}

export {
    IBlockCompProps,
    IValidationErrorCompProps,
    IProfileInfoCompProps,
    IProfileInfoCompPropsItem,
    IPopupCompProps,
    IPopupCompPropsItem,
    IModalCompProps,
    IMessageCompProps,
    IInputCompProps,
    IChatListItemCompProps,
    IButtonCompProps
}