import fetch from "cross-fetch";
import Lodash from "lodash";

let currentData: ContentCategoryData[] = [];

export function getContentCategories(): ContentCategoryData[] {
    return currentData;
}

export async function queryForContentData(): Promise<void> {
    try {
        const response = await fetchContentCategories();
        if (response.ok) {
            const {data, errors} = await response.json();

            if (errors) {
                console.log('ContentCategories Query resulted in errors:', errors);
            } else {
                currentData = data.contentCategories.sort((a, b) => {
                    const sortIndexA = Lodash.isNil(a.sortIndex) ? 0 : a.sortIndex;
                    const sortIndexB = Lodash.isNil(b.sortIndex) ? 0 : a.sortIndex;

                    return sortIndexB - sortIndexA;
                });
            }

        } else {
            console.log(`Failed to fetch content categories: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log('Unexpected error', err);
    }
}

export async function startWatchingContentCategoryData(): Promise<void> {
    try {
        return await queryForContentData();
    } finally {
        setTimeout(startWatchingContentCategoryData, 5000);
    }
}

function fetchContentCategories(): Promise<Response> {
    return fetch(`${process.env.DATA_SERVER_GRAPHQL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query GatherContentCategories {
                    contentCategories {
                        id
                        name
                        folderPrefix
                        sortIndex
                        detection {
                            mode
                            alg
                            fields {
                                id
                                regex
                            }
                        }
                     }
                }
            `
        })
    })
}

export interface ContentCategoryData { //TODO figure out how to pull from data server
    id: number
    name: string
    folderPrefix: string
    sortIndex: number
    detection: DetectionSpec
}

export interface DetectionSpec {
    mode: string,
    alg: string
    fields: DetectionField[]
}

export interface DetectionField {
    id: string,
    regex: string
}
