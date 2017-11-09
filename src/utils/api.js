const api = {
  getBio(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then(response => {
      return response.json();
    });
  },
  getRepos(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then(response => {
      return response.json();
    });
  },
  getNotes(username) {
    username = username.trim();
    const url = `https://github-saver-22843.firebaseio.com/${username}.json`;
    return fetch(url).then(res => res.json());
  },
  addNote(username, note) {
    username = username.trim();
    const url = `https://github-saver-22843.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(note),
    }).then(res => res.json());
  },
};

export default api;
