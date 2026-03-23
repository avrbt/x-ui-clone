const seedPosts = [
  {
    id: crypto.randomUUID(),
    name: 'Aviral',
    handle: '@avrbt',
    time: '1h',
    text: 'Shipped a richer X clone: tabs, dark mode, trends, and post interactions. #webdev #buildinpublic',
    media: '',
    likes: 21,
    reposts: 6,
    replies: 4,
    views: 1903,
    verified: false,
    following: true
  },
  {
    id: crypto.randomUUID(),
    name: 'X Engineering',
    handle: '@xeng',
    time: '3h',
    text: 'Performance pass complete. Timeline render is now snappier for heavy feeds.',
    media: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=70',
    likes: 448,
    reposts: 125,
    replies: 58,
    views: 18822,
    verified: true,
    following: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Dev Daily',
    handle: '@devdaily',
    time: '6h',
    text: 'Consistency beats intensity. Build daily and ship weekly. #frontend #career',
    media: '',
    likes: 119,
    reposts: 48,
    replies: 9,
    views: 5701,
    verified: false,
    following: true
  }
];

const state = {
  tab: 'for-you',
  query: '',
  posts: loadPosts(),
  theme: localStorage.getItem('theme') || 'light'
};

const timeline = document.getElementById('timeline');
const tabs = document.querySelectorAll('.tab');
const search = document.getElementById('search');
const postText = document.getElementById('post-text');
const mediaUrl = document.getElementById('media-url');
const postBtn = document.getElementById('create-post');
const primaryPost = document.getElementById('primary-post');
const charCount = document.getElementById('char-count');
const themeToggle = document.getElementById('theme-toggle');

init();

function init() {
  applyTheme();
  render();

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      state.tab = tab.dataset.tab;
      tabs.forEach((x) => x.classList.remove('active'));
      tab.classList.add('active');
      render();
    });
  });

  search.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  const syncCounter = () => {
    charCount.textContent = String(280 - postText.value.length);
  };

  postText.addEventListener('input', syncCounter);
  postBtn.addEventListener('click', createPost);
  primaryPost.addEventListener('click', () => postText.focus());

  themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    applyTheme();
  });

  syncCounter();
}

function render() {
  const filtered = state.posts.filter((post) => {
    const inTab = state.tab === 'for-you' || post.following;
    const inQuery = !state.query || `${post.name} ${post.handle} ${post.text}`.toLowerCase().includes(state.query);
    return inTab && inQuery;
  });

  timeline.innerHTML = filtered.map(postMarkup).join('');

  timeline.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const post = state.posts.find((p) => p.id === button.dataset.id);
      const action = button.dataset.action;
      if (!post) return;

      if (action === 'like') {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
      }

      if (action === 'repost') {
        post.reposted = !post.reposted;
        post.reposts += post.reposted ? 1 : -1;
      }

      savePosts();
      render();
    });
  });

  renderTrends();
}

function createPost() {
  const text = postText.value.trim();
  if (!text) return;

  const media = mediaUrl.value.trim();
  state.posts.unshift({
    id: crypto.randomUUID(),
    name: 'Aviral',
    handle: '@avrbt',
    time: 'now',
    text,
    media,
    likes: 0,
    reposts: 0,
    replies: 0,
    views: 0,
    verified: false,
    following: true
  });

  postText.value = '';
  mediaUrl.value = '';
  charCount.textContent = '280';
  savePosts();
  render();
}

function renderTrends() {
  const trends = {};

  state.posts.forEach((post) => {
    const tags = post.text.match(/#[a-zA-Z0-9_]+/g) || [];
    tags.forEach((tag) => {
      trends[tag] = (trends[tag] || 0) + 1;
    });
  });

  const top = Object.entries(trends)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const list = document.getElementById('trends-list');
  list.innerHTML = top.length
    ? top.map(([tag, count]) => `<li><span>${tag}</span><small>${count} posts</small></li>`).join('')
    : '<li><span>No trends yet</span></li>';
}

function postMarkup(post) {
  return `
    <article class="post">
      <div class="avatar">${post.name[0]}</div>
      <div class="post-body">
        <div class="post-header">
          <span class="name">${post.name}</span>
          ${post.verified ? '<span class="verified">✔</span>' : ''}
          <span class="meta">${post.handle} · ${post.time}</span>
        </div>

        <p class="post-text">${escapeHtml(post.text)}</p>
        ${post.media ? `<img class="post-media" src="${post.media}" alt="Post media for ${post.handle}" />` : ''}

        <div class="post-actions">
          <button class="action" title="Reply">💬 <span>${post.replies}</span></button>
          <button class="action ${post.reposted ? 'active repost' : ''}" data-action="repost" data-id="${post.id}" title="Repost">🔁 <span>${post.reposts}</span></button>
          <button class="action ${post.liked ? 'active like' : ''}" data-action="like" data-id="${post.id}" title="Like">♥ <span>${post.likes}</span></button>
          <button class="action" title="Views">📊 <span>${post.views}</span></button>
          <button class="action" title="Bookmark">🔖</button>
        </div>
      </div>
    </article>
  `;
}

function applyTheme() {
  document.body.classList.toggle('dark', state.theme === 'dark');
}

function loadPosts() {
  const saved = localStorage.getItem('x-clone-posts');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [...seedPosts];
    }
  }
  return [...seedPosts];
}

function savePosts() {
  localStorage.setItem('x-clone-posts', JSON.stringify(state.posts));
}

function escapeHtml(input) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
