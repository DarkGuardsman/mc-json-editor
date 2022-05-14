import {useItemDisplayInfoQuery} from "../../../../../generated/graphql";
import {FcHighPriority, FcPackage, FcSynchronize} from "react-icons/fc";
import styles from './ItemDisplay.module.css'
import {ItemKey} from "../../../../../type/ItemKey";

interface ItemDisplayProps {
    itemID: ItemKey,
}

/**
 * Handles display an item
 * @param itemID
 * @constructor
 */
export default function ItemDisplay({itemID}: ItemDisplayProps): JSX.Element {
    if(itemID === undefined || itemID === null) {
        return ( //TODO add tooltip to note this is intentionally blank for screen readers
            <div className={styles.div}>

            </div>
        )
    }

    return <ItemDisplayFetch itemID={itemID} />;
}

interface ItemDisplayFetchProps {
    itemID: string,
}

function ItemDisplayFetch({itemID}: ItemDisplayFetchProps): JSX.Element {

    const {loading, error, data} = useItemDisplayInfoQuery({
        variables: {
            itemID
        }
    });

    if (loading) {
        return (
            <div className={styles.div}>
                <FcSynchronize className={styles.icon}/>
            </div>
        )
    } else if (error
        || data?.data === null || data?.data === undefined
        || data?.data?.item === null || data?.data?.item === undefined) {
        return (
            <div className={styles.div}>
                <FcHighPriority className={styles.icon}/>
            </div>
        )
    } else if (data?.data?.item?.image === null || data?.data?.item?.image === undefined
        || data?.data?.item?.image?.url === null || data?.data?.item?.image?.url === undefined
    ) {
        return (
            <div className={styles.div}>
                <FcPackage className={styles.icon}/>
            </div>
        )
    }

    const {url, altText} = data.data.item.image;
    return (
        <div className={styles.div}>
            <img
                className={styles.img}
                src={url}
                alt={altText === undefined || altText === null ? url : altText}
            />
        </div>
    );
}