import FileEntryList from "../entry/FileEntryList";


interface TemplateEntryProps {
    projectId: Number,
    categoryId: Number,
    categoryName: String
}

export default function ContentCategoryMenu({categoryId, projectId, categoryName}: TemplateEntryProps): JSX.Element {
    return (
        <div className='content-category-entry' id={`content-category-${categoryId}`}>
            <h3>{categoryName}</h3>
            <FileEntryList categoryId={categoryId} projectId={projectId}/>
        </div>
    );
}