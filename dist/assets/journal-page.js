(function () {
  const Store = window.MinlabsStore;
  if (!Store) return;

  const pageType = document.body.getAttribute('data-page-type');

  // Secret 5-click on footer copyright to enter Admin
  const footerCopy = document.querySelector('.journal-footer > span, footer > p');
  if (footerCopy) {
    let clickCount = 0;
    let timer = null;
    footerCopy.addEventListener('click', () => {
      clickCount++;
      clearTimeout(timer);
      if (clickCount >= 5) {
        clickCount = 0;
        window.location.href = '/admin.html';
      } else {
        timer = setTimeout(() => { clickCount = 0; }, 1600);
      }
    });
  }

  if (pageType === 'detail') {
    initDetailPage();
  } else if (pageType === 'blog' || pageType === 'review') {
    initListPage(pageType);
  }

  function initListPage(type) {
    let activeTag = '전체';
    let currentSort = 'latest';
    let searchQuery = '';

    const tagsBarEl = document.getElementById('journal-tags-bar');
    const heroContainerEl = document.getElementById('journal-hero-container');
    const gridEl = document.getElementById('journal-grid');
    const countNumEl = document.getElementById('post-count-num');
    const searchInputEl = document.getElementById('journal-search-input');
    const sortButtons = document.querySelectorAll('[data-sort]');

    function collectFilterTags() {
      const allOfType = Store.getPosts({ type });
      const tagSet = new Set();
      allOfType.forEach(p => {
        if (p.category) tagSet.add(p.category);
        if (Array.isArray(p.tags)) {
          p.tags.forEach(t => tagSet.add(t));
        }
      });
      return ['전체', ...Array.from(tagSet).slice(0, 7)];
    }

    function renderFilterPills() {
      if (!tagsBarEl) return;
      const tags = collectFilterTags();
      tagsBarEl.innerHTML = tags
        .map(tag => {
          const isActive = tag === activeTag ? 'active' : '';
          return `<button type="button" class="filter-pill ${isActive}" data-tag="${Store.escapeHtml(tag)}">${Store.escapeHtml(tag)}</button>`;
        })
        .join('');

      tagsBarEl.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          activeTag = btn.getAttribute('data-tag') || '전체';
          renderFilterPills();
          renderPosts();
        });
      });
    }

    function renderPosts() {
      const posts = Store.getPosts({
        type,
        tag: activeTag,
        query: searchQuery,
        sort: currentSort
      });

      if (countNumEl) {
        countNumEl.textContent = String(posts.length);
      }

      if (posts.length === 0) {
        if (heroContainerEl) heroContainerEl.innerHTML = '';
        if (gridEl) {
          gridEl.innerHTML = `
            <div class="journal-empty" style="grid-column: 1 / -1;">
              <p style="font-size: 16px; font-weight: 800; color: #19181e; margin: 0 0 8px;">조건에 맞는 글이 없어요.</p>
              <p style="margin: 0; font-size: 14px;">다른 검색어나 태그를 선택해보세요.</p>
            </div>
          `;
        }
        return;
      }

      let heroPost = posts.find(p => p.featured) || posts[0];
      const gridPosts = posts.filter(p => p.id !== heroPost.id);

      if (heroContainerEl) {
        heroContainerEl.innerHTML = `
          <a class="hero-card" href="/post.html?id=${encodeURIComponent(heroPost.id)}">
            ${Store.renderThumbnailHTML(heroPost, true)}
            <div class="hero-card-body">
              <div class="hero-badges">
                <span class="editors-pick-pill">EDITOR'S PICK</span>
                <span class="hero-cat-text">${Store.escapeHtml(heroPost.category)}</span>
              </div>
              <h2 class="hero-title">${Store.escapeHtml(heroPost.title)}</h2>
              <p class="hero-summary">${Store.escapeHtml(heroPost.summary)}</p>
              <div class="hero-meta">${Store.escapeHtml(heroPost.date)} &nbsp;·&nbsp; ${heroPost.readMin || 5} MIN READ</div>
            </div>
          </a>
        `;
      }

      if (gridEl) {
        gridEl.innerHTML = gridPosts
          .map(post => {
            const tagsHtml = (post.tags || [])
              .slice(0, 3)
              .map(t => `<span class="journal-tag-chip">#${Store.escapeHtml(t)}</span>`)
              .join('');
            return `
              <a class="journal-card" href="/post.html?id=${encodeURIComponent(post.id)}">
                <div class="journal-card-thumb-frame">
                  ${Store.renderThumbnailHTML(post, false)}
                </div>
                <div class="journal-card-body">
                  <h3 class="journal-card-title">${Store.escapeHtml(post.title)}</h3>
                  <p class="journal-card-summary">${Store.escapeHtml(post.summary)}</p>
                  <div class="journal-card-tags">${tagsHtml}</div>
                  <div class="journal-card-meta">
                    <span>${Store.escapeHtml(post.date)} &nbsp;·&nbsp; ${post.readMin || 5} MIN</span>
                    <span class="card-arrow-circle" aria-hidden="true">↗</span>
                  </div>
                </div>
              </a>
            `;
          })
          .join('');
      }
    }

    if (searchInputEl) {
      searchInputEl.addEventListener('input', () => {
        searchQuery = searchInputEl.value;
        renderPosts();
      });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputEl) searchInputEl.focus();
      }
    });

    sortButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentSort = btn.getAttribute('data-sort') || 'latest';
        sortButtons.forEach(b => b.classList.toggle('active', b === btn));
        renderPosts();
      });
    });

    window.addEventListener('storage', () => {
      renderFilterPills();
      renderPosts();
    });

    renderFilterPills();
    renderPosts();
  }

  function initDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('post-detail-root');
    if (!container) return;

    const post = id ? Store.getPostById(id) : null;
    if (!post) {
      container.innerHTML = `
        <div class="journal-empty">
          <p style="font-size: 18px; font-weight: 800; color: #19181e; margin: 0 0 10px;">이 글을 찾을 수 없어요.</p>
          <p style="margin: 0 0 20px;">삭제되었거나 잘못된 주소입니다.</p>
          <a href="/blog.html" class="post-back-link">블로그 목록으로 이동 →</a>
        </div>
      `;
      return;
    }

    document.title = `${post.title} | Minlabs`;
    const backHref = post.type === 'review' ? '/reviews.html' : '/blog.html';
    const backLabel = post.type === 'review' ? '← 후기 목록으로' : '← 블로그 목록으로';

    const navBlog = document.querySelector('.journal-nav-link[href="/blog.html"]');
    const navReview = document.querySelector('.journal-nav-link[href="/reviews.html"]');
    if (post.type === 'review' && navReview) navReview.classList.add('active');
    if (post.type === 'blog' && navBlog) navBlog.classList.add('active');

    const tagsHtml = (post.tags || [])
      .map(t => `<span class="journal-tag-chip">#${Store.escapeHtml(t)}</span>`)
      .join('');

    const adminEditBtn = Store.isAdminAuthenticated()
      ? `<a class="post-back-link" href="/admin.html?edit=${encodeURIComponent(post.id)}" style="background:#d5ff45;">글 수정 ↗</a>`
      : '';

    container.innerHTML = `
      <div class="post-back-row">
        <a class="post-back-link" href="${backHref}">${backLabel}</a>
        ${adminEditBtn}
      </div>
      <div class="post-detail-card">
        <div class="hero-badges">
          ${post.featured ? '<span class="editors-pick-pill">EDITOR\'S PICK</span>' : ''}
          <span class="hero-cat-text">${Store.escapeHtml(post.category)}</span>
        </div>
        <h1 class="post-detail-title">${Store.escapeHtml(post.title)}</h1>
        <div class="post-detail-meta">
          <span>${Store.escapeHtml(post.date)} &nbsp;·&nbsp; ${post.readMin || 5} MIN READ</span>
          <div class="journal-card-tags" style="margin-top:0;">${tagsHtml}</div>
        </div>
        <div class="post-detail-thumb">
          ${Store.renderThumbnailHTML(post, true)}
        </div>
        <article class="post-content">
          ${Store.renderMarkdown(post.content)}
        </article>
      </div>
    `;
  }
})();
