import ItemSlot from "../slot/ItemSlot";

interface ItemGridRowProps {
    items: string[]
}

export default function ItemGridRow({items}: ItemGridRowProps): JSX.Element {
    return (
        <div>
            {
                items.map(item => <ItemSlot itemID={item} />)
            }
        </div>
    )
}