export interface ProcessingSchema {
    components: ComponentSchemas[]
}

export type ComponentSchemas = ComponentSchema | ItemGridSchema | ItemResultSchema

export interface ComponentSchema {
    key: string
}

export interface ItemGridSchema extends ComponentSchema {
    field: string,
    processing?: ProcessingSchemaSteps[]
}

export interface ItemResultSchema extends ComponentSchema {
    field: string,
    item: {
        field: string,
        processing?: ProcessingSchemaSteps[]
    },
    count: {
        field: string,
        processing?: ProcessingSchemaSteps[]
    }
}

export type ProcessingSchemaSteps = ProcessingSchemaStep | ProcessingLookupJson | ProcessingStringFormat

export interface ProcessingSchemaStep {
    action: string,
    processing?: ProcessingSchemaSteps[]
}

export interface ProcessingLookupJson extends ProcessingSchemaStep {
    field: string,
    arg: string
}

export interface ProcessingStringFormat extends ProcessingSchemaStep {
    data: string[],
    format: string
}