import fetch from "cross-fetch";
import Lodash from "lodash";

let watchTimer;

let currentData;

export function getContentCategories() {
    return currentData;
}

export function queryForContentData() {
    return fetchContentCategories().then(async response => {
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
    }).catch((err) => {
        console.log('Unexpected error', err);
    })
}

export function startWatchingContentCategoryData() {
    return queryForContentData().finally(() => {
        watchTimer = setTimeout(startWatchingContentCategoryData, 5000);
    })
}

function fetchContentCategories() {
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