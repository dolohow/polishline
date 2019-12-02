const API_BASE_URL = 'https://api.polishline.pl/wp-json/wp/v2';

const API_POSTS = `${API_BASE_URL}/posts?_embed`;

function getPostURL(postId) {
    return `${API_BASE_URL}/posts/${postId}?_embed`;
}

export { API_POSTS, getPostURL };