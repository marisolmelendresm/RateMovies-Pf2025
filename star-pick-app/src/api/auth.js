
export async function authFetch(url, options = {}, logout) {
    const response = await fetch(url, options);

    if (response.status === 401) {
        logout("Session expired, please login again");
        throw new Error("Unauthorized");
    }

    return response;
}