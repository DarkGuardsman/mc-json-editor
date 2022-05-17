import {ItemTableQuery, ItemTableQueryResult, useItemTableQuery} from "../../generated/graphql";
import {useTable} from 'react-table'
import React from "react";
import './ItemViewer.css';
import {itemTableDataVar} from "../../ApolloSetup";
import {ItemTableRow} from "../../types/ItemTableRows";
import {useReactiveVar} from "@apollo/client";


export default function ItemViewer(): JSX.Element {
    const {data, loading, error} = useItemTableQuery({
        onCompleted : (data) => {
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
                    },
                ],
            },
        ],
        []
    );
    const rowData = useReactiveVar(itemTableDataVar);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        // @ts-ignore
        data: rowData,
    })

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
            {rows.map((row, i) => {
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
    )
}

function flattenQueryData(data: ItemTableQuery) : ItemTableRow[] {
    if(data?.packageSets === null || data?.packageSets === undefined) {
        return [];
    }
    return data.packageSets.flatMap(packageSet => {
        if(packageSet === null || packageSet === undefined || packageSet.packages === undefined || packageSet.packages == null) {
            return {};
        }
        return packageSet.packages.flatMap(pack => {
            if(pack=== null || pack === undefined || pack.contents === undefined || pack.contents == null) {
                return {};
            }
            return pack.contents.flatMap(content => {
                if(content === null || content === undefined || content.entries === undefined || content.entries == null) {
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