export interface DropDownAction {
    label: string;
    onClick: () => void;
}

export interface DropDown {
    label: string;
    description?: string;
    image?: string;
    tags?: string[];
    onDelete?: () => void;
    onOpen?: () => void;
    actions?: DropDownAction[];
}