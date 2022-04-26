import {currentFileVar} from "../../../ApolloSetup";

interface FileEntryProps {
    fileName: String
}

export default function FileEntry({fileName}: FileEntryProps): JSX.Element {
    return (
        <button
            onClick={() => currentFileVar(fileName)}
        >
            {`${fileName}`}
        </button>
    )
}