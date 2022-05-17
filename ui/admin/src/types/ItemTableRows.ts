
export interface ItemTableRow {
    packageSet?: ItemTablePackageSet,
    package?: ItemTablePackage,
    category?: ItemTableCategory,
    entry?: ItemTableEntry
}

export interface ItemTablePackageSet {
    id?: number,
    name?: string
}

export interface ItemTableCategory {
    id?: number,
    name?: string
}

export interface ItemTablePackage {
    id?: number,
    name?: string
}

export interface ItemTableEntry {
    id?: number,
    name?: string
}