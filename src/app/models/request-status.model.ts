export type RequestStatus = 'init' | 'loading' | 'success' | 'failed';

export type SQLError = {
        path: string,
        timestamp: string,
        name: string,
        message: string,
        code: string
}
export type RequestResponse = {
    headers: any,
    status: number,
    statusText: string,
    url: string,
    ok: boolean,
    name: string,
    message: string,
    error: SQLError
};

export type RecoveryTokenResponse = {
    link: string,
    token: string
}
