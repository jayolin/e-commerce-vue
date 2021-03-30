const baseURL = "https://pangaea-interviews.now.sh/api/graphql";
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

class http{
    static post (query) {
        const body = {
            query: `{${query}}`
        };

        return fetch(baseURL, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
    }
}

export default http




