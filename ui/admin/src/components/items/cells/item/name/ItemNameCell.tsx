import {ItemTableRow} from "../../../../../types/ItemTableRows";
import {UseTableCellProps} from "react-table";
import {useState} from "react";

export interface ItemNameCellProps extends UseTableCellProps<ItemTableRow, string> {
    updateDataField: Function
}

export default function ItemNameCell(cell: ItemNameCellProps) {
    const rowIndex = cell.row.index;
    const value = cell.value;

    const [userText, setUserText] = useState(value);

    return (
        <input
            value={userText}
            onChange={(event) => {
                setUserText(event.target.value)
            }}
            onBlur={(event) => {
                cell.updateDataField(rowIndex, "entry.name", event.target.value)
            }}
        />
    )
}