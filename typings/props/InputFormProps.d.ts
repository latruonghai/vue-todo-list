import { BasicProps } from './index.d';
interface InputFormProps extends BasicProps {
    extraClassName?: string;
    labelName?: string;
    placeholderString?: string;
    inputType?: string;
    inputName?: string;
    typeName: TypeInput;
}

export type TypeInput = 'text' | 'date';
export { InputFormProps };
