import apiClient from '../apiClient';

export const fetchUsers = async (query, dispatch) => {
  const { items } = await apiClient('search/users', { q: query });
  dispatch({ type: 'GET_USERS', payload: items });
};

export const fetchUser = async (username, dispatch) => {
  const data = await apiClient(`users/${username}`);
  dispatch({ type: 'GET_USER', payload: data });
};

export const clearUsers = dispatch => {
  dispatch({ type: 'CLEAR_USERS', payload: [] });
};

export const fetchRepos = async (user, dispatch) => {
  const data = await apiClient(`users/${user}/repos`, {
    sort: 'updated',
    per_page: '10',
  });
  dispatch({ type: 'GET_USER_REPOS', payload: data });
};
