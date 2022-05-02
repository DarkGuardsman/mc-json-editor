import fetch from "cross-fetch";

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
                currentData = data.contentCategories;
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
                        }
                     }
                }
            `
        })
    })
}