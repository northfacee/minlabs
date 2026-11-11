(function () {
  const Store = window.MinlabsStore;
  if (!Store) return;

  const pageType = document.body.getAttribute('data-page-type');

  // Secret 5-click on footer copyright to enter Admin
  const footerCopy = document.querySelector('footer > p');
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
    let searchQuery = '';

    const tagsBarEl = document.getElementById('journal-tags-bar');
    const gridEl = document.getElementById('journal-grid');
    const searchInputEl = document.getElementById('journal-search-input');

    function collectFilterTags() {
      const allOfType = Store.getPosts({ type });
      const catSet = new Set();
      allOfType.forEach(p => {
        if (p.category) catSet.add(p.category);
      });
      return ['전체', ...Array.from(catSet)];
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
      if (!gridEl) return;
      const posts = Store.getPosts({
        type,
        tag: activeTag,
        query: searchQuery
      });

      if (posts.length === 0) {
        gridEl.innerHTML = `
          <div class="journal-empty">
            <p style="font-size: 15px; font-weight: 650; color: var(--ink); margin-bottom: 6px;">일치하는 글이 없어요.</p>
            <p style="font-size: 13.5px;">다른 검색어나 카테고리를 선택해보세요.</p>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = posts
        .map(post => `
          <a class="journal-card" href="/post.html?id=${encodeURIComponent(post.id)}">
            ${Store.renderCardBodyInnerHTML(post)}
          </a>
        `)
        .join('');
    }

    if (searchInputEl) {
      searchInputEl.addEventListener('input', () => {
        searchQuery = searchInputEl.value;
        renderPosts();
      });
    }

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
          <p style="font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px;">이 글을 찾을 수 없어요.</p>
          <p style="margin-bottom: 18px; font-size: 14px;">삭제되었거나 잘못된 주소입니다.</p>
          <a href="/blog.html" class="home-link">블로그 목록으로 이동 →</a>
        </div>
      `;
      return;
    }

    document.title = `${post.title} | Minlabs`;
    const backHref = post.type === 'review' ? '/reviews.html' : '/blog.html';
    const backLabel = post.type === 'review' ? '← 후기 목록' : '← 블로그 목록';

    const navBlog = document.querySelector('.nav-link[href="/blog.html"]');
    const navReview = document.querySelector('.nav-link[href="/reviews.html"]');
    if (post.type === 'review' && navReview) navReview.classList.add('active');
    if (post.type === 'blog' && navBlog) navBlog.classList.add('active');

    const tagsHtml = (post.tags || [])
      .map(t => `<span class="journal-tag-chip">#${Store.escapeHtml(t)}</span>`)
      .join('');

    const adminEditBtn = Store.isAdminAuthenticated()
      ? `<a class="post-edit-link" href="/admin.html?edit=${encodeURIComponent(post.id)}">글 수정</a>`
      : '';

    const coverHtml = post.thumbnailImage
      ? `<div class="post-detail-cover"><img src="${Store.escapeHtml(post.thumbnailImage)}" alt=""></div>`
      : '';

    container.innerHTML = `
      <div class="post-back-row">
        <a class="post-back-link" href="${backHref}">${backLabel}</a>
        ${adminEditBtn}
      </div>
      <header class="post-detail-header">
        <div class="journal-card-top" style="margin-bottom: 0;">
          ${Store.getMiniIconHTML(post)}
          <span class="journal-cat-label">${Store.escapeHtml(post.category)}</span>
          <span class="journal-meta-dot" aria-hidden="true">·</span>
          <span class="journal-date-text">${Store.escapeHtml(post.date)}</span>
        </div>
        <h1 class="post-detail-title">${Store.escapeHtml(post.title)}</h1>
        ${tagsHtml ? `<div class="post-detail-tags">${tagsHtml}</div>` : ''}
      </header>
      ${coverHtml}
      <article class="post-content">
        ${Store.renderMarkdown(post.content)}
      </article>
    `;
  }
})();
