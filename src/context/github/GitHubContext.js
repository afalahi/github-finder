import { useReducer, createContext } from 'react';
import githubReducer from './GithubReducer';

import apiClient from '../../apiClient';

const GithubContext = createContext();
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  const fetchUser = async username => {
    const data = await apiClient(`users/${username}`);
    dispatch({ type: 'GET_USER', payload: data });
  };
  const fetchUsers = async query => {
    setLoading();
    const { items } = await apiClient('search/users', { q: query });
    dispatch({ type: 'GET_USERS', payload: items });
  };
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS', payload: [] });
  };

  const fetchRepos = async user => {
    setLoading();
    const data = await apiClient(`users/${user}/repos`, {
      sort: 'updated',
      per_page: '10',
    });
    dispatch({ type: 'GET_USER_REPOS', payload: data });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        fetchUsers,
        fetchUser,
        clearUsers,
        fetchRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
