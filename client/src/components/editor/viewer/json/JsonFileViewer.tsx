import ReactJson from 'react-json-view'

interface ViewTabProps {
    json : object
}

export default function JsonFileViewer({json}: ViewTabProps): JSX.Element {
    if(json === undefined) {
        return (
            <div>
                Nothing to display
            </div>
        )
    }
    return (
        <div>
            <ReactJson src={json} />
        </div>
    );
}