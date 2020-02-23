const API_BASE_URL = 'https://api.polishline.pl/wp-json/wp/v2';

const API_POSTS = `${API_BASE_URL}/posts`;

function getPostURL(postId) {
    return `${API_BASE_URL}/posts/${postId}?_embed`;
}

function getSearchPosts(search_param) {
    return `${API_BASE_URL}/posts?search=${search_param}`;
}

export { API_POSTS, getPostURL, getSearchPosts };