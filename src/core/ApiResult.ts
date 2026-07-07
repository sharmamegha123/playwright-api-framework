export interface ApiResult<T> {
    status: number;
    headers: Record<string, string>;
    body: T;
    duration?: number;
}