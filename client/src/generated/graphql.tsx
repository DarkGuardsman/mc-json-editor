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

export type ContentEntry = {
  __typename?: 'ContentEntry';
  description: Scalars['String'];
  file: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type ContentGroup = {
  __typename?: 'ContentGroup';
  category?: Maybe<ContentCategory>;
  entries?: Maybe<Array<Maybe<ContentEntry>>>;
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
  category: ContentCategory;
  fileContents?: Maybe<Scalars['JSON']>;
  key: Scalars['String'];
  name: Scalars['String'];
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

export type ProjectContentsListQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectContentsListQuery = { __typename?: 'Query', project?: { __typename?: 'Project', contents?: Array<{ __typename?: 'ProjectFileSet', category: { __typename?: 'ContentCategory', id: number, name: string } } | null> | null } | null };

export type ProjectFilesListQueryVariables = Exact<{
  categoryId: Scalars['Int'];
  projectId: Scalars['Int'];
}>;


export type ProjectFilesListQuery = { __typename?: 'Query', project?: { __typename?: 'Project', content?: { __typename?: 'ProjectFileSet', entries: Array<{ __typename?: 'ProjectFileEntry', name: string } | null> } | null } | null };

export type ProjectsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsListQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: number, name: string } | null> | null };


export const ProjectContentsListDocument = gql`
    query ProjectContentsList($id: Int!) {
  project(id: $id) {
    contents {
      category {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useProjectContentsListQuery__
 *
 * To run a query within a React component, call `useProjectContentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectContentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectContentsListQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectContentsListQuery(baseOptions: Apollo.QueryHookOptions<ProjectContentsListQuery, ProjectContentsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectContentsListQuery, ProjectContentsListQueryVariables>(ProjectContentsListDocument, options);
      }
export function useProjectContentsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectContentsListQuery, ProjectContentsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectContentsListQuery, ProjectContentsListQueryVariables>(ProjectContentsListDocument, options);
        }
export type ProjectContentsListQueryHookResult = ReturnType<typeof useProjectContentsListQuery>;
export type ProjectContentsListLazyQueryHookResult = ReturnType<typeof useProjectContentsListLazyQuery>;
export type ProjectContentsListQueryResult = Apollo.QueryResult<ProjectContentsListQuery, ProjectContentsListQueryVariables>;
export const ProjectFilesListDocument = gql`
    query ProjectFilesList($categoryId: Int!, $projectId: Int!) {
  project(id: $projectId) {
    content(id: $categoryId) {
      entries {
        name
      }
    }
  }
}
    `;

/**
 * __useProjectFilesListQuery__
 *
 * To run a query within a React component, call `useProjectFilesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFilesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFilesListQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectFilesListQuery(baseOptions: Apollo.QueryHookOptions<ProjectFilesListQuery, ProjectFilesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectFilesListQuery, ProjectFilesListQueryVariables>(ProjectFilesListDocument, options);
      }
export function useProjectFilesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectFilesListQuery, ProjectFilesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectFilesListQuery, ProjectFilesListQueryVariables>(ProjectFilesListDocument, options);
        }
export type ProjectFilesListQueryHookResult = ReturnType<typeof useProjectFilesListQuery>;
export type ProjectFilesListLazyQueryHookResult = ReturnType<typeof useProjectFilesListLazyQuery>;
export type ProjectFilesListQueryResult = Apollo.QueryResult<ProjectFilesListQuery, ProjectFilesListQueryVariables>;
export const ProjectsListDocument = gql`
    query ProjectsList {
  projects {
    id
    name
  }
}
    `;

/**
 * __useProjectsListQuery__
 *
 * To run a query within a React component, call `useProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsListQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsListQuery, ProjectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsListQuery, ProjectsListQueryVariables>(ProjectsListDocument, options);
      }
export function useProjectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsListQuery, ProjectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsListQuery, ProjectsListQueryVariables>(ProjectsListDocument, options);
        }
export type ProjectsListQueryHookResult = ReturnType<typeof useProjectsListQuery>;
export type ProjectsListLazyQueryHookResult = ReturnType<typeof useProjectsListLazyQuery>;
export type ProjectsListQueryResult = Apollo.QueryResult<ProjectsListQuery, ProjectsListQueryVariables>;