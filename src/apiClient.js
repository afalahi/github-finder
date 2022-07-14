const apiClient = async (path, options) => {
  let url = process.env.REACT_APP_GITHUB_URL;
  if (options) {
    const params = new URLSearchParams(options);
    url = `${url}/${path}?${params}`;
  } else {
    url = `${url}/${path}`;
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });
  if (res.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await res.json();
    return data;
  }
};

export default apiClient;
