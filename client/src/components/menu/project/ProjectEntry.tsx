import TemplateEntryList from "../template/TemplateEntryList";

interface ProjectEntryProps {
    projectId: Number,
    projectName: String
}

export default function ProjectEntry({projectId, projectName}: ProjectEntryProps): JSX.Element {
    return (
        <li id={`project-${projectId}`}>
            <div className='project-entry' id={`project-${projectId}`}>
                <h3>{projectName}</h3>
                <TemplateEntryList projectId={projectId}/>
            </div>
        </li>
    );
}