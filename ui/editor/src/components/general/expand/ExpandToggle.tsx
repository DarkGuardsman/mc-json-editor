import {MouseEventHandler} from "react";

interface ExpandToggleProps {
    isExpanded: Boolean
    children: JSX.Element
}

/**
 * Area that can be toggled to show or hide, aka expanded or collapsed
 *
 * @param {boolean} isExpanded - true to show as expanded
 * @param {MouseEventHandler<HTMLButtonElement>} onClick - callback for when clicked, can be used to update state
 */
export default function ExpandToggle({isExpanded, children}: ExpandToggleProps) {
    if (isExpanded) {
       return children;
    }
    return null
}