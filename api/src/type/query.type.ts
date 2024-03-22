interface Query {
    tableName: string;
}

export interface ReadQuery extends Query {
    searchData: Record<string, any>;
    selectedColumn: Array<string>;
}

export interface WriteQuery extends Query {
    data: Record<string, any>;
    conditions?: Record<string, string>;
}

export interface ReadQueryParams extends Query {
    params: Record<string, string>
    columns?: Array<string>
}

export interface WriteQueryParams extends Query {
    data: Record<string, any>
    conditions?: Record<string, string>
}