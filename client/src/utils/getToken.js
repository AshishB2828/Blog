export function isTokenExist() {
    return localStorage.getItem("token") ? true : false;
}

export function geUserToken() {
    return localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}