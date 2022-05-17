import ItemSlot from "../slot/ItemSlot";
import styles from './ItemRow.module.css';
import {ItemKey} from "../../../../../type/ItemKey";

interface ItemGridRowProps {
    items: ItemKey[]
}

export default function ItemRow({items}: ItemGridRowProps): JSX.Element {
    return (
        <div className={styles.row}>
            {
                items.map(item => <ItemSlot itemID={item} />)
            }
        </div>
    )
}