import { useState, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import GithubContext from '../../context/github/GitHubContext';

const UserSearch = () => {
  const [term, setTerm] = useState('');
  const { users, fetchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (!term || term.trim().length === 0) {
      setAlert('You must type something', 'error');
    } else {
      fetchUsers(term);
      setTerm('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
              <button
                className={`absolute top-0 right-0 rounded-l-none w-36 btn btn-lg ${
                  !term && 'btn-disabled text-gray-500'
                } `}
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={clearUsers}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
export default UserSearch;
