import FileEntryList from "../entry/FileEntryList";


interface TemplateEntryProps {
    projectId: Number,
    templateId: Number,
    templateName: String
}

export default function TemplateEntry({templateId, projectId, templateName}: TemplateEntryProps): JSX.Element {
    return (
        <div className='template-entry' id={`template-${templateId}`}>
            <h3>{templateName}</h3>
            <FileEntryList templateId={templateId} projectId={projectId}/>
        </div>
    );
}