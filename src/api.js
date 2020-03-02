const API_BASE_URL = 'https://api.polishline.pl/wp-json/wp/v2';

const API_POSTS = `${API_BASE_URL}/posts`;

async function getSearchPostResults(searchParam) {
    return await (await fetch(`${API_POSTS}?search=${searchParam}`)).json();
}

async function getPost(postId) {
    return await (await fetch(`${API_POSTS}/${postId}?_embed`)).json();
}

export { getPost, getSearchPostResults };