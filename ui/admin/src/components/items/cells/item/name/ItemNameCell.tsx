import {ItemTableRow} from "../../../../../types/ItemTableRows";
import {UseTableCellProps} from "react-table";
import {itemTableDataVar} from "../../../../../ApolloSetup";
import {useState} from "react";


export default function ItemNameCell(cell: UseTableCellProps<ItemTableRow, string>) {
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
                const copyOfArray = itemTableDataVar();
                copyOfArray[rowIndex] = {
                    ...copyOfArray[rowIndex],
                    entry: {
                        ...copyOfArray[rowIndex].entry,
                        name: event.target.value
                    }
                }
                itemTableDataVar(copyOfArray);
            }}
        />
    )
}