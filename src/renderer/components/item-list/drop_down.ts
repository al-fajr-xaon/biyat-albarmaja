export interface DropDownAction {
    label: string;
    onClick: () => void;
}

export interface DropDown {
    label: string;
    description?: string;
    image?: string;
    actions?: DropDownAction[];
}