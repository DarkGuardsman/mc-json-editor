import styles from './ItemSlot.module.css'
import ItemDisplay from "../display/ItemDisplay"
import {ItemKey} from "../../../../../type/ItemKey";

interface ItemSlotProps {
    itemID: ItemKey,
}

/**
 * Slot version of an item, acts mostly as a CSS wrapper
 * @param {string} itemID - reference key to item to display
 */
export default function ItemSlot({itemID}: ItemSlotProps): JSX.Element {
    return (
        <div className={styles.slot}>
            <ItemDisplay itemID={itemID}/>
        </div>
    );
}