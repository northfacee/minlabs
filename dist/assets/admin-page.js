(function () {
  const Store = window.MinlabsStore;
  if (!Store) return;

  let currentFilter = 'all';
  let searchQuery = '';
  let editingId = null;
  let editorType = 'blog';
  let currentTags = [];

  // List View Elements
  const listContainer = document.getElementById('admin-post-list');
  const filterTabs = document.querySelectorAll('#admin-filter-tabs .admin-tab');
  const searchInput = document.getElementById('admin-search-input');
  const btnNewPost = document.getElementById('btn-new-post');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnResetDefaults = document.getElementById('btn-reset-defaults');

  // Editor View Elements
  const typeBtns = document.querySelectorAll('[data-editor-type]');
  const edCategory = document.getElementById('ed-category');
  const edFeatured = document.getElementById('ed-featured');
  const btnToggleDrawer = document.getElementById('btn-toggle-card-drawer');
  const cardDrawer = document.getElementById('velog-card-drawer');
  const edSublabel = document.getElementById('ed-sublabel');
  const edIconType = document.getElementById('ed-icon-type');
  const edBannerLine1 = document.getElementById('ed-banner-line1');
  const edBannerHl = document.getElementById('ed-banner-hl');
  const edBannerLine2 = document.getElementById('ed-banner-line2');
  const edThemeColor = document.getElementById('ed-theme-color');
  const edSummary = document.getElementById('ed-summary');
  const edTitle = document.getElementById('ed-title');
  const edTagsList = document.getElementById('ed-tags-list');
  const edTagInput = document.getElementById('ed-tag-input');
  const edBody = document.getElementById('ed-body');
  const edImageFile = document.getElementById('ed-image-file');
  const edCardPreview = document.getElementById('ed-card-preview');
  const edPreviewTitle = document.getElementById('ed-preview-title');
  const edBodyPreview = document.getElementById('ed-body-preview');
  const btnEditorExit = document.getElementById('btn-editor-exit');
  const btnSaveDraft = document.getElementById('btn-save-draft');
  const btnPublishPost = document.getElementById('btn-publish-post');
  const toastEl = document.getElementById('admin-toast');

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2600);
  }

  function updateCounts() {
    const all = Store.loadAllPosts();
    const publishedBlogs = all.filter(p => p.type === 'blog' && p.status !== 'draft');
    const publishedReviews = all.filter(p => p.type === 'review' && p.status !== 'draft');
    const drafts = all.filter(p => p.status === 'draft');

    document.getElementById('cnt-all').textContent = String(all.length);
    document.getElementById('cnt-blog').textContent = String(publishedBlogs.length);
    document.getElementById('cnt-review').textContent = String(publishedReviews.length);
    document.getElementById('cnt-draft').textContent = String(drafts.length);
  }

  function renderAdminList() {
    updateCounts();
    let list = Store.loadAllPosts();

    if (currentFilter === 'blog') {
      list = list.filter(p => p.type === 'blog' && p.status !== 'draft');
    } else if (currentFilter === 'review') {
      list = list.filter(p => p.type === 'review' && p.status !== 'draft');
    } else if (currentFilter === 'draft') {
      list = list.filter(p => p.status === 'draft');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (list.length === 0) {
      listContainer.innerHTML = `
        <div class="journal-empty">
          <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 8px;">등록된 글이 없습니다.</p>
          <p style="margin:0 0 18px;font-size:14px;">우측 상단의 '+ 새 글 작성' 버튼을 눌러 블로그나 후기 글을 작성해보세요.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = list
      .map(post => {
        const typeBadge = post.type === 'review'
          ? '<span class="badge-type-review">후기 (Reviews)</span>'
          : '<span class="badge-type-blog">블로그 (Blog)</span>';
        const draftBadge = post.status === 'draft'
          ? '<span class="badge-draft">임시저장</span>'
          : '';
        const featuredBadge = post.featured
          ? '<span class="badge-featured">★ EDITOR\'S PICK</span>'
          : '';
        const tagsText = (post.tags || []).map(t => `#${Store.escapeHtml(t)}`).join(' ');

        return `
          <div class="admin-post-row">
            <div class="admin-row-thumb">
              ${Store.renderThumbnailHTML(post, false)}
            </div>
            <div class="admin-row-info">
              <div class="admin-row-badges">
                ${typeBadge}
                ${draftBadge}
                ${featuredBadge}
                <span style="font-size:12px;color:#94a3b8;font-weight:600;">${Store.escapeHtml(post.category)}</span>
              </div>
              <h3 class="admin-row-title">${Store.escapeHtml(post.title)}</h3>
              <p class="admin-row-summary">${Store.escapeHtml(post.summary)}</p>
              <div class="admin-row-meta">${Store.escapeHtml(post.date)} · ${post.readMin || 5} MIN · ${tagsText}</div>
            </div>
            <div class="admin-row-actions">
              <button type="button" class="row-btn" data-action="edit" data-id="${Store.escapeHtml(post.id)}">수정</button>
              <button type="button" class="row-btn" data-action="feature" data-id="${Store.escapeHtml(post.id)}" title="상단 대표글로 지정">대표글 ★</button>
              <button type="button" class="row-btn" data-action="switch-type" data-id="${Store.escapeHtml(post.id)}">${post.type === 'review' ? '→ 블로그로' : '→ 후기로'}</button>
              <a class="row-btn" href="/post.html?id=${encodeURIComponent(post.id)}" target="_blank">보기 ↗</a>
              <button type="button" class="row-btn row-btn-danger" data-action="delete" data-id="${Store.escapeHtml(post.id)}">삭제</button>
            </div>
          </div>
        `;
      })
      .join('');

    listContainer.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (action === 'edit') {
          openEditor(id);
        } else if (action === 'feature') {
          Store.setFeaturedPost(id);
          renderAdminList();
          showToast('상단 대표글(EDITOR\'S PICK)로 설정되었습니다.');
        } else if (action === 'switch-type') {
          const target = Store.getPostById(id);
          if (target) {
            target.type = target.type === 'review' ? 'blog' : 'review';
            Store.savePost(target);
            renderAdminList();
            showToast(`${target.type === 'review' ? '후기' : '블로그'} 게시판으로 이동되었습니다.`);
          }
        } else if (action === 'delete') {
          if (window.confirm('이 글을 삭제하시겠습니까?')) {
            Store.deletePost(id);
            renderAdminList();
            showToast('글이 삭제되었습니다.');
          }
        }
      });
    });
  }

  function setEditorType(type) {
    editorType = type === 'review' ? 'review' : 'blog';
    typeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-editor-type') === editorType);
    });
    updateLivePreview();
  }

  function renderTagChips() {
    edTagsList.innerHTML = currentTags
      .map((tag, idx) => `<span class="velog-tag-pill" data-idx="${idx}" title="클릭하여 태그 삭제">${Store.escapeHtml(tag)} <span aria-hidden="true">×</span></span>`)
      .join('');

    edTagsList.querySelectorAll('.velog-tag-pill').forEach(chip => {
      chip.addEventListener('click', () => {
        const i = Number(chip.getAttribute('data-idx'));
        currentTags.splice(i, 1);
        renderTagChips();
        updateLivePreview();
      });
    });
  }

  function buildDraftObject(statusOverride) {
    const titleVal = edTitle.value.trim() || '제목을 입력하세요';
    const catVal = edCategory.value.trim() || (editorType === 'review' ? '서비스 후기' : 'Minlabs');
    const existing = editingId ? Store.getPostById(editingId) : null;

    return {
      id: editingId || `${editorType}-${Date.now()}`,
      type: editorType,
      status: statusOverride || 'published',
      featured: edFeatured.checked,
      category: catVal,
      subLabel: edSublabel.value.trim() || (editorType === 'review' ? '실사용 후기 · 스토리' : `${catVal} · 아티클`),
      bannerLine1: edBannerLine1.value.trim(),
      bannerHighlight: edBannerHl.value.trim(),
      bannerLine2: edBannerLine2.value.trim(),
      iconType: edIconType.value,
      themeColor: edThemeColor.value,
      summary: edSummary.value.trim(),
      title: titleVal,
      tags: currentTags.length ? currentTags.slice() : [catVal.replace(/\s+/g, '')],
      date: existing ? existing.date : undefined,
      views: existing ? existing.views : 150,
      content: edBody.value
    };
  }

  function updateLivePreview() {
    const temp = buildDraftObject('published');
    const auto = Store.autoBannerFromTitle(temp.title, temp.category);
    const previewPost = Object.assign({}, temp, {
      bannerLine1: temp.bannerLine1 || auto.bannerLine1,
      bannerHighlight: temp.bannerHighlight || auto.bannerHighlight,
      bannerLine2: temp.bannerLine2 || auto.bannerLine2,
      summary: temp.summary
        ? (temp.summary.startsWith('핵심 요약') ? temp.summary : `핵심 요약 ${temp.summary}`)
        : `핵심 요약 ${(temp.content || '본문을 입력하면 이곳에 요약이 자동으로 표시됩니다.').replace(/[#>*`]/g, '').slice(0, 95)}...`,
      date: temp.date || '2026.10.23',
      readMin: Store.calcReadMinutes(temp.content)
    });

    const tagsHtml = (previewPost.tags || [])
      .slice(0, 3)
      .map(t => `<span class="journal-tag-chip">#${Store.escapeHtml(t)}</span>`)
      .join('');

    edCardPreview.innerHTML = `
      <div class="journal-card" style="pointer-events:none;">
        <div class="journal-card-thumb-frame">
          ${Store.renderThumbnailHTML(previewPost, false)}
        </div>
        <h3 class="journal-card-title">${Store.escapeHtml(previewPost.title)}</h3>
        <p class="journal-card-summary">${Store.escapeHtml(previewPost.summary)}</p>
        <div class="journal-card-tags">${tagsHtml}</div>
        <div class="journal-card-meta">${Store.escapeHtml(previewPost.date)} &nbsp;·&nbsp; ${previewPost.readMin} MIN</div>
      </div>
    `;

    edPreviewTitle.textContent = previewPost.title;
    edBodyPreview.innerHTML = Store.renderMarkdown(temp.content || '*당신의 이야기를 적어보세요...*');
  }

  function openEditor(postId, defaultType) {
    editingId = postId || null;
    const existing = postId ? Store.getPostById(postId) : null;

    if (existing) {
      setEditorType(existing.type);
      edCategory.value = existing.category || '';
      edFeatured.checked = Boolean(existing.featured);
      edSublabel.value = existing.subLabel || '';
      edIconType.value = existing.iconType || 'toepick';
      edBannerLine1.value = existing.bannerLine1 || '';
      edBannerHl.value = existing.bannerHighlight || '';
      edBannerLine2.value = existing.bannerLine2 || '';
      edThemeColor.value = existing.themeColor || 'blue';
      edSummary.value = existing.summary || '';
      edTitle.value = existing.title || '';
      currentTags = Array.isArray(existing.tags) ? existing.tags.slice() : [];
      edBody.value = existing.content || '';
    } else {
      setEditorType(defaultType || (currentFilter === 'review' ? 'review' : 'blog'));
      edCategory.value = editorType === 'review' ? 'ToePick 후기' : 'ToePick';
      edFeatured.checked = false;
      edSublabel.value = '';
      edIconType.value = editorType === 'review' ? 'star' : 'toepick';
      edBannerLine1.value = '';
      edBannerHl.value = '';
      edBannerLine2.value = '';
      edThemeColor.value = 'blue';
      edSummary.value = '';
      edTitle.value = '';
      currentTags = [];
      edBody.value = '';
    }

    renderTagChips();
    updateLivePreview();
    document.body.classList.add('mode-editor');
    setTimeout(() => edTitle.focus(), 40);
  }

  function closeEditor() {
    document.body.classList.remove('mode-editor');
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    url.searchParams.delete('type');
    window.history.replaceState({}, '', url.pathname);
    renderAdminList();
  }

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentFilter = tab.getAttribute('data-filter') || 'all';
      filterTabs.forEach(t => t.classList.toggle('active', t === tab));
      renderAdminList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      renderAdminList();
    });
  }

  if (btnNewPost) {
    btnNewPost.addEventListener('click', () => openEditor(null));
  }

  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const data = JSON.stringify(Store.loadAllPosts(), null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'minlabs-posts.json';
      a.click();
      showToast('JSON 백업 파일이 다운로드되었습니다.');
    });
  }

  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (window.confirm('기본 샘플 글(블로그 6개, 후기 6개) 상태로 초기화하시겠습니까?')) {
        Store.resetToDefaults();
        renderAdminList();
        showToast('기본 샘플 데이터가 복원되었습니다.');
      }
    });
  }

  // Editor Type Switch (Blog vs Review)
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setEditorType(btn.getAttribute('data-editor-type'));
    });
  });

  if (btnToggleDrawer) {
    btnToggleDrawer.addEventListener('click', () => {
      cardDrawer.classList.toggle('open');
    });
  }

  // IME-safe Tag Input Handler (per modern-web-guidance: ime-safe-enter-submit)
  if (edTagInput) {
    edTagInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ',') {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        event.preventDefault();
        const raw = edTagInput.value.replace(/[,#]/g, '').trim();
        if (raw && !currentTags.includes(raw)) {
          currentTags.push(raw);
          renderTagChips();
          updateLivePreview();
        }
        edTagInput.value = '';
      } else if (event.key === 'Backspace' && !edTagInput.value && currentTags.length > 0) {
        currentTags.pop();
        renderTagChips();
        updateLivePreview();
      }
    });
  }

  // Toolbar Markdown Actions
  function insertMarkdown(type) {
    const start = edBody.selectionStart;
    const end = edBody.selectionEnd;
    const val = edBody.value;
    const selected = val.slice(start, end);

    let replacement = '';
    let cursorOffset = 0;

    switch (type) {
      case 'h1':
        replacement = `\n# ${selected || '제목 1'}\n`;
        break;
      case 'h2':
        replacement = `\n## ${selected || '제목 2'}\n`;
        break;
      case 'h3':
        replacement = `\n### ${selected || '제목 3'}\n`;
        break;
      case 'h4':
        replacement = `\n#### ${selected || '제목 4'}\n`;
        break;
      case 'bold':
        replacement = `**${selected || '굵은 텍스트'}**`;
        break;
      case 'italic':
        replacement = `*${selected || '기울임 텍스트'}*`;
        break;
      case 'strike':
        replacement = `~~${selected || '취소선 텍스트'}~~`;
        break;
      case 'quote':
        replacement = `\n> ${selected || '인용구 내용을 입력하세요.'}\n`;
        break;
      case 'link': {
        const url = window.prompt(' 연결할 URL을 입력하세요:', 'https://');
        if (!url) return;
        replacement = `[${selected || '링크 텍스트'}](${url})`;
        break;
      }
      case 'image':
        edImageFile.click();
        return;
      case 'code':
        replacement = `\n\`\`\`\n${selected || '// 코드를 입력하세요'}\n\`\`\`\n`;
        break;
      default:
        return;
    }

    edBody.value = val.slice(0, start) + replacement + val.slice(end);
    edBody.focus();
    cursorOffset = start + replacement.length;
    edBody.setSelectionRange(cursorOffset, cursorOffset);
    updateLivePreview();
  }

  document.querySelectorAll('[data-md]').forEach(btn => {
    btn.addEventListener('click', () => {
      insertMarkdown(btn.getAttribute('data-md'));
    });
  });

  if (edImageFile) {
    edImageFile.addEventListener('change', () => {
      const file = edImageFile.files && edImageFile.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const pos = edBody.selectionStart || edBody.value.length;
        const imgMd = `\n![${file.name}](${dataUrl})\n`;
        edBody.value = edBody.value.slice(0, pos) + imgMd + edBody.value.slice(pos);
        updateLivePreview();
      };
      reader.readAsDataURL(file);
      edImageFile.value = '';
    });
  }

  // Live Preview Listeners
  [
    edTitle, edCategory, edFeatured, edSublabel,
    edIconType, edBannerLine1, edBannerHl, edBannerLine2,
    edThemeColor, edSummary, edBody
  ].forEach(el => {
    if (!el) return;
    el.addEventListener('input', updateLivePreview);
    el.addEventListener('change', updateLivePreview);
  });

  if (btnEditorExit) {
    btnEditorExit.addEventListener('click', () => {
      closeEditor();
    });
  }

  if (btnSaveDraft) {
    btnSaveDraft.addEventListener('click', () => {
      if (!edTitle.value.trim()) {
        edTitle.focus();
        showToast('제목을 입력해주세요.');
        return;
      }
      const saved = Store.savePost(buildDraftObject('draft'));
      editingId = saved.id;
      showToast('임시저장되었습니다.');
    });
  }

  if (btnPublishPost) {
    btnPublishPost.addEventListener('click', () => {
      if (!edTitle.value.trim()) {
        edTitle.focus();
        showToast('제목을 입력해주세요.');
        return;
      }
      const saved = Store.savePost(buildDraftObject('published'));
      editingId = saved.id;
      const targetName = saved.type === 'review' ? '후기' : '블로그';
      showToast(`${targetName} 페이지에 성공적으로 출간되었습니다!`);
      setTimeout(() => {
        closeEditor();
      }, 650);
    });
  }

  // Check URL query params for direct editor launch (?edit=id or ?type=blog|review)
  const params = new URLSearchParams(window.location.search);
  renderAdminList();
  if (params.get('edit')) {
    openEditor(params.get('edit'));
  } else if (params.get('type')) {
    openEditor(null, params.get('type'));
  }
})();
