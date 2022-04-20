import {currentFileVar} from "../../../ApolloSetup";

interface FileEntryProps {
    fileName: String
}

export default function FileEntry({fileName}: FileEntryProps): JSX.Element {
    return (
        <li id={`file-${fileName}`}>
            <button
                onClick={() => currentFileVar(fileName)}
            >
                {`${fileName}`}
            </button>
        </li>
    )
}