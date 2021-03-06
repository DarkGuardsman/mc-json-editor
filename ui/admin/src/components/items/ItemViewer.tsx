import {ItemTableQuery, useItemTableQuery} from "../../generated/graphql";
import {Row, usePagination, useTable} from 'react-table'
import React from "react";
import './ItemViewer.css';
import {itemTableDataVar} from "../../ApolloSetup";
import {ItemTableRow} from "../../types/ItemTableRows";
import {useReactiveVar} from "@apollo/client";
import ItemNameCell from "./cells/item/name/ItemNameCell";


export default function ItemViewer(): JSX.Element {
    const {loading, error} = useItemTableQuery({
        onCompleted: (data) => {
            itemTableDataVar(flattenQueryData(data));
        }
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Package Set',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'packageSet.id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'packageSet.name',
                    },
                ],
            },
            {
                Header: 'Package',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'package.id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'package.name',
                    },
                ],
            },
            {
                Header: 'Entry',
                columns: [
                    {
                        Header: 'Category',
                        accessor: 'category.name',
                    },
                    {
                        Header: 'ID',
                        accessor: 'entry.id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'entry.name',
                        Cell: ItemNameCell
                    },
                ],
            },
        ],
        []
    );
    const rowData = useReactiveVar(itemTableDataVar);

    const [skipPageReset, setSkipPageReset] = React.useState(false);


    const updateDataField = (rowIndex: number, field: string, value: any) => {
        setSkipPageReset(true);

        //TODO handle better
        if(field === "entry.name") {
            console.log("saving field", rowIndex, field, value);
            const copyOfArray = [...itemTableDataVar()];
            copyOfArray[rowIndex] = {
                ...copyOfArray[rowIndex],
                entry: {
                    ...copyOfArray[rowIndex].entry,
                    name: value
                }
            }
            itemTableDataVar(copyOfArray);
        }
    }

    // @ts-ignore
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // @ts-ignore
        page,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        pageOptions,
        // @ts-ignore
        pageCount,
        // @ts-ignore
        gotoPage,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        setPageSize,
        state: {
            // @ts-ignore
            pageIndex,
            // @ts-ignore
            pageSize
        },
    } = useTable(
        {
            columns,
            data: rowData,
            initialState: {
                // @ts-ignore
                pageIndex: 0
            },
            autoResetPage: !skipPageReset,
            updateDataField
        },
        usePagination
    );

    React.useEffect(() => {
        setSkipPageReset(false)
    }, [rowData]);

    if (loading) {
        return (
            <div>
                Loading data from server
            </div>
        )
    } else if (error) {
        return (
            <div>
                Unexpected error while loading data from server!
            </div>
        )
    }

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row: Row<ItemTableRow>, i: any) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                {' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                {' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                {' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                {' '}
                <span>
          Page{' '}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                <span>
          | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{width: '100px'}}
                    />
        </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

function flattenQueryData(data: ItemTableQuery): ItemTableRow[] {
    if (data?.packageSets === null || data?.packageSets === undefined) {
        return [];
    }
    return data.packageSets.flatMap(packageSet => {
        if (packageSet === null || packageSet === undefined || packageSet.packages === undefined || packageSet.packages == null) {
            return {};
        }
        return packageSet.packages.flatMap(pack => {
            if (pack === null || pack === undefined || pack.contents === undefined || pack.contents == null) {
                return {};
            }
            return pack.contents.flatMap(content => {
                if (content === null || content === undefined || content.entries === undefined || content.entries == null) {
                    return {};
                }
                return content.entries.map(entry => {
                    return {
                        packageSet: {
                            id: packageSet.id,
                            name: packageSet.name
                        },
                        "package": {
                            id: pack.id,
                            name: pack.name
                        },
                        category: {
                            id: content.category?.id,
                            name: content.category?.name
                        },
                        entry: {
                            id: entry?.id,
                            name: entry?.name
                        }
                    }
                })
            })
        })
    });
}