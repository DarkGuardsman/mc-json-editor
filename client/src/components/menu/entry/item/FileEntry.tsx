import {currentFileVar} from "../../../../ApolloSetup";
import {FiFolder, FiFile, FiChevronRight} from 'react-icons/fi'

interface FileEntryProps {
    fileName: String
}

export default function FileEntry({fileName}: FileEntryProps): JSX.Element {
    return (
        <div>
            <FiChevronRight/>
            <FiFolder/>
            <FiFile/>
            <button
                onClick={() => currentFileVar(fileName)}
            >
                {`${fileName}`}
            </button>
        </div>
    )
}