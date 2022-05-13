import styles from './ItemSlot.module.css'
import ItemGridRow from "./ItemGridRow";

interface ItemGridProps {
    items: string[][]
}

/**
 * Slot version of an item, acts mostly as a CSS wrapper
 * @param {string} itemID - reference key to item to display
 */
export default function ItemGrid({items}: ItemGridProps): JSX.Element {
    return (
        <div className={styles.div}>
            {
                items.map((items, index) =>
                    <ItemGridRow
                        items={items}
                        key={`y-row-${index}`}
                    />
                )
            }
        </div>
    );
}

