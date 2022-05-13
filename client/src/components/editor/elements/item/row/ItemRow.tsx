import ItemSlot from "../slot/ItemSlot";
import styles from './ItemRow.module.css';

interface ItemGridRowProps {
    items: string[]
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