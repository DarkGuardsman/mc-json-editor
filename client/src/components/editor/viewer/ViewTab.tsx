import ReactJson from 'react-json-view'

interface ViewTabProps {
    json : JSON
}

export default function ViewTab({json}: ViewTabProps): JSX.Element {
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