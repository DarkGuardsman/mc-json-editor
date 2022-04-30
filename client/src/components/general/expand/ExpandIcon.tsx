import {FiChevronDown, FiChevronRight} from "react-icons/fi";
import {MouseEventHandler} from "react";
import styles from './ExpandIcon.module.css'

interface ExpandIconProps {
    isExpanded: Boolean
    onClick: MouseEventHandler<HTMLButtonElement>
    className: string
}

/**
 * Icon that can be clicked to expand/collapse
 *
 * @param {boolean} isExpanded - true to show as expanded
 * @param {MouseEventHandler<HTMLButtonElement>} onClick - callback for when clicked, can be used to update state
 */
export default function ExpandIcon({isExpanded, onClick, className}: ExpandIconProps) {
    if (isExpanded) {
        return (
            <button onClick={onClick} className={`${styles.button} ${className}`}>
                <FiChevronRight/>
            </button>
        );
    }
    return (
        <button onClick={onClick} className={`${styles.button} ${className}`}>
            <FiChevronDown/>
        </button>
    );
}