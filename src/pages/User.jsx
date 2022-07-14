import { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCode, FaUserFriends, FaUsers, FaGitAlt } from 'react-icons/fa';

import GithubContext from '../context/github/GitHubContext';
import Spinner from '../components/shared/Spinner';
import RepoList from '../components/repos/RepoList';
import { getUserAndRepos } from '../actions/githubActions';

const User = () => {
  const { login } = useParams();
  const { user, loading, repos, dispatch } = useContext(GithubContext);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    getUserAndRepos(login, dispatch);
  }, [login, dispatch]);
  
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost'>
            Back to Search
          </Link>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={avatar_url} alt={`${login}-avatar`} />
              </figure>
              <div className='card-body justify-end'>
                <h2 className='card-title mb-0'>{name}</h2>
                <p className='flex-grow-0'>{login}</p>
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='mb-6'>
              <h1 className='text-3xl card-tile'>
                {name}
                <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                {hireable && (
                  <div className='mx-1 badge badge-info'>Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className='mt-4 card-actions'>
                <a
                  className='btn btn-outline'
                  href={html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Visit Profile
                </a>
              </div>
            </div>
            <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
              {location && (
                <div className='stat'>
                  <div className='stat-tile text-md'>Location</div>
                  <div className='text-lg stat-value'>{location}</div>
                </div>
              )}
              {blog && (
                <div className='stat'>
                  <div className='stat-tile text-md'>Website</div>
                  <div className='text-lg stat-value'>
                    <a href={blog} target='_blank' rel='noopener noreferrer'>
                      {blog}
                    </a>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className='stat'>
                  <div className='stat-tile text-md'>Twitter</div>
                  <div className='text-lg stat-value'>
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUsers className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title-pr-5'>Followers</div>
            <div className='stat-value pr-5 text-3xl md:text-4xl'>
              {followers}
            </div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUserFriends className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title-pr-5'>Following</div>
            <div className='stat-value pr-5 text-3xl md:text-4xl'>
              {following}
            </div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaGitAlt className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title-pr-5'>Public Repos</div>
            <div className='stat-value pr-5 text-3xl md:text-4xl'>
              {public_repos}
            </div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaCode className='text-3xl md:text-5xl' />
            </div>
            <div className='stat-title-pr-5'>Public Gist</div>
            <div className='stat-value pr-5 text-3xl md:text-4xl'>
              {public_gists}
            </div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>
    </>
  );
};
export default User;
