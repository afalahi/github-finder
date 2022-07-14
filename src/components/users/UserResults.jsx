import {useContext } from 'react';

import GithubContext from '../../context/github/GitHubContext';
import Spinner from '../shared/Spinner';
import UserItem from './UserItem';

const UserResults = () => {
  const { users, loading } = useContext(GithubContext);
  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {!loading ? (
        users.map(user => <UserItem key={user.id} user={user} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default UserResults;
