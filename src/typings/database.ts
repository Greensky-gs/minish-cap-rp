type callbackOptions = (error: string, request?: any[]) => any;
type queryOptions = (sql: string, callback: callbackOptions) => any;

export type database = {
    query: queryOptions,
    connect: (error?: any) => any;
};