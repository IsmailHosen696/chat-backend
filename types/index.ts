export type usertype = {
    _id?: string;
    email: string;
    profile?: string
    password: string;
    username: string;
}
export type chatusertype = {
    _id?: string;
    profile?: string;
    email: string;
    username: string;
}
export enum Actions {
    SEARCH_RECENT_TEXT = "search-recent-text",
    USER_LOGIN = "login-context",
    USER_LOGOUT = "logout-context",
}