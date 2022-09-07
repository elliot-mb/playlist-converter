export type Access = { 
    access_token: string,
    expires_in: number,
    refresh_token: string
}

export type AccessCode = {
    access_code: string
}

export type ErrorBox = { error: string }

export const isErrorOrUndefined = (x: any): boolean => {
    return x === undefined || x === null || 'error' in x;
}