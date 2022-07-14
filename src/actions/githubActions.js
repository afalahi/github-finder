import apiClient from '../apiClient';

export const fetchUsers = async (query, dispatch) => {
  const { items } = await apiClient('search/users', { q: query });
  dispatch({ type: 'GET_USERS', payload: items });
};

export const clearUsers = dispatch => {
  dispatch({ type: 'CLEAR_USERS', payload: [] });
};

export const getUserAndRepos = async (username, dispatch) => {
  const [user, repos] = await Promise.all([
    apiClient(`users/${username}`),
    await apiClient(`users/${username}/repos`, {
      sort: 'updated',
      per_page: '10',
    }),
  ]);
  dispatch({ type: 'GET_USER_AND_REPOS', payload: { user, repos } });
};
