import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type ContentAuthor = {
  __typename?: 'ContentAuthor';
  curseForgeUrl: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ContentCategory = {
  __typename?: 'ContentCategory';
  detection?: Maybe<Detection>;
  folderPrefix: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  sortIndex?: Maybe<Scalars['Int']>;
  spec: ContentCategorySpec;
};

export type ContentCategorySpec = {
  __typename?: 'ContentCategorySpec';
  id: Scalars['String'];
  version: Scalars['String'];
};

export type ContentGroup = {
  __typename?: 'ContentGroup';
  category?: Maybe<ContentCategory>;
  entries?: Maybe<Array<Maybe<ContentItemEntry>>>;
};

export type ContentImage = {
  __typename?: 'ContentImage';
  altText: Scalars['String'];
  url: Scalars['String'];
};

export type ContentItemEntry = {
  __typename?: 'ContentItemEntry';
  id: Scalars['Int'];
  image?: Maybe<ContentImage>;
  key: Scalars['String'];
  name: Scalars['String'];
};

export type ContentPackage = {
  __typename?: 'ContentPackage';
  contents?: Maybe<Array<Maybe<ContentGroup>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  owner?: Maybe<ContentAuthor>;
  team?: Maybe<Array<Maybe<ContentAuthor>>>;
};

export type ContentPackageSet = {
  __typename?: 'ContentPackageSet';
  id: Scalars['Int'];
  name: Scalars['String'];
  packages?: Maybe<Array<Maybe<ContentPackage>>>;
};

export type DataQuery = {
  __typename?: 'DataQuery';
  item?: Maybe<ContentItemEntry>;
};


export type DataQueryItemArgs = {
  id?: InputMaybe<Scalars['Int']>;
  key?: InputMaybe<Scalars['String']>;
};

export type Detection = {
  __typename?: 'Detection';
  alg?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<DetectionField>>>;
  mode: Scalars['String'];
};

export type DetectionField = {
  __typename?: 'DetectionField';
  id: Scalars['String'];
  regex: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  content?: Maybe<ProjectFileSet>;
  contents?: Maybe<Array<Maybe<ProjectFileSet>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type ProjectContentArgs = {
  id: Scalars['Int'];
};

export type ProjectFileEntry = {
  __typename?: 'ProjectFileEntry';
  _projectId?: Maybe<Scalars['Int']>;
  category: ContentCategory;
  fileContents?: Maybe<Scalars['JSON']>;
  key: Scalars['String'];
  name: Scalars['String'];
  project?: Maybe<Project>;
};

export type ProjectFileSet = {
  __typename?: 'ProjectFileSet';
  category: ContentCategory;
  entries: Array<Maybe<ProjectFileEntry>>;
  parentId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  contentCategories?: Maybe<Array<Maybe<ContentCategory>>>;
  contentCategory?: Maybe<ContentCategory>;
  data?: Maybe<DataQuery>;
  file?: Maybe<ProjectFileEntry>;
  packageSet?: Maybe<ContentPackageSet>;
  packageSets?: Maybe<Array<Maybe<ContentPackageSet>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type QueryContentCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryFileArgs = {
  key: Scalars['String'];
  projectId: Scalars['Int'];
};


export type QueryPackageSetArgs = {
  id: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};

export type ItemTableQueryVariables = Exact<{
  itemID?: InputMaybe<Scalars['String']>;
}>;


export type ItemTableQuery = { __typename?: 'Query', packageSets?: Array<{ __typename?: 'ContentPackageSet', id: number, name: string, packages?: Array<{ __typename?: 'ContentPackage', id: number, name: string, contents?: Array<{ __typename?: 'ContentGroup', category?: { __typename?: 'ContentCategory', id: number, name: string } | null, entries?: Array<{ __typename?: 'ContentItemEntry', id: number, name: string } | null> | null } | null> | null } | null> | null } | null> | null };


export const ItemTableDocument = gql`
    query ItemTable($itemID: String) {
  packageSets {
    id
    name
    packages {
      id
      name
      contents {
        category {
          id
          name
        }
        entries {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useItemTableQuery__
 *
 * To run a query within a React component, call `useItemTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemTableQuery({
 *   variables: {
 *      itemID: // value for 'itemID'
 *   },
 * });
 */
export function useItemTableQuery(baseOptions?: Apollo.QueryHookOptions<ItemTableQuery, ItemTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemTableQuery, ItemTableQueryVariables>(ItemTableDocument, options);
      }
export function useItemTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemTableQuery, ItemTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemTableQuery, ItemTableQueryVariables>(ItemTableDocument, options);
        }
export type ItemTableQueryHookResult = ReturnType<typeof useItemTableQuery>;
export type ItemTableLazyQueryHookResult = ReturnType<typeof useItemTableLazyQuery>;
export type ItemTableQueryResult = Apollo.QueryResult<ItemTableQuery, ItemTableQueryVariables>;