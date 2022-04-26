import TemplateEntryList from "./TemplateEntryList";


interface TemplateEntryProps {
    templateId: Number,
    templateName: String
}

export default function TemplateEntry({templateId, templateName}: TemplateEntryProps): JSX.Element {
    return (
        <div className='template-entry' id={`template-${templateId}`}>
            <h3>{templateName}</h3>
            <TemplateEntryList templateId={templateId}/>
        </div>
    );
}