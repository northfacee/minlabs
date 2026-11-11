(function () {
  const Store = window.MinlabsStore;
  if (!Store) return;

  // Security Constants (Salted SHA-256)
  const PW_SALT = 'minlabs-cms-salt-2026::';
  const DEFAULT_PW_HASH = '1e8f8de04d53a48af90640dc394028ff4a9521e13cc9ba161a7820434978dfae';
  const CUSTOM_HASH_KEY = 'minlabs_admin_pw_hash_v1';
  const LOCKOUT_KEY = 'minlabs_admin_lockout_v1';
  const SESSION_DURATION_MS = 30 * 60 * 1000;

  const workspaceEl = document.getElementById('admin-protected-workspace');
  const loginForm = document.getElementById('admin-login-form');
  const pwInput = document.getElementById('current-password');
  const btnTogglePw = document.getElementById('btn-toggle-pw');
  const authErrorEl = document.getElementById('auth-error-msg');
  const btnLoginSubmit = document.getElementById('btn-login-submit');
  const btnLockAdmin = document.getElementById('btn-lock-admin');
  const btnOpenPwDialog = document.getElementById('btn-open-pw-dialog');
  const pwDialog = document.getElementById('pw-change-dialog');
  const pwChangeForm = document.getElementById('pw-change-form');
  const newPwInput = document.getElementById('new-password');
  const btnClosePwDialog = document.getElementById('btn-close-pw-dialog');

  let currentFilter = 'all';
  let searchQuery = '';
  let editingId = null;
  let editorType = 'blog';
  let currentTags = [];

  const listContainer = document.getElementById('admin-post-list');
  const filterTabs = document.querySelectorAll('#admin-filter-tabs .admin-tab');
  const searchInput = document.getElementById('admin-search-input');
  const btnNewPost = document.getElementById('btn-new-post');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnResetDefaults = document.getElementById('btn-reset-defaults');

  const typeBtns = document.querySelectorAll('[data-editor-type]');
  const edCategory = document.getElementById('ed-category');
  const edFeatured = document.getElementById('ed-featured');
  const btnToggleDrawer = document.getElementById('btn-toggle-card-drawer');
  const cardDrawer = document.getElementById('velog-card-drawer');
  const edIconType = document.getElementById('ed-icon-type');
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
    }, 2400);
  }

  async function sha256Hex(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(PW_SALT + text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getTargetHash() {
    return localStorage.getItem(CUSTOM_HASH_KEY) || DEFAULT_PW_HASH;
  }

  function getLockoutState() {
    try {
      const raw = localStorage.getItem(LOCKOUT_KEY);
      if (!raw) return { fails: 0, lockedUntil: 0 };
      return JSON.parse(raw);
    } catch (e) {
      return { fails: 0, lockedUntil: 0 };
    }
  }

  function setLockoutState(state) {
    try {
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function checkLockoutTimer() {
    const state = getLockoutState();
    const remainingMs = state.lockedUntil - Date.now();
    if (remainingMs > 0) {
      const sec = Math.ceil(remainingMs / 1000);
      authErrorEl.textContent = `비밀번호 5회 오류로 잠겼습니다. ${sec}초 후 다시 시도하세요.`;
      btnLoginSubmit.disabled = true;
      pwInput.disabled = true;
      setTimeout(checkLockoutTimer, 1000);
      return true;
    }
    if (btnLoginSubmit.disabled) {
      btnLoginSubmit.disabled = false;
      pwInput.disabled = false;
      authErrorEl.textContent = '';
      setLockoutState({ fails: 0, lockedUntil: 0 });
    }
    return false;
  }

  function unlockWorkspace() {
    sessionStorage.setItem(
      Store.AUTH_SESSION_KEY,
      JSON.stringify({ unlocked: true, expiresAt: Date.now() + SESSION_DURATION_MS })
    );
    document.body.classList.add('is-unlocked');
    if (workspaceEl) workspaceEl.removeAttribute('inert');
    document.title = '글 관리 | Minlabs';
    initWorkspaceAfterAuth();
  }

  function lockWorkspace() {
    sessionStorage.removeItem(Store.AUTH_SESSION_KEY);
    document.body.classList.remove('is-unlocked', 'mode-editor');
    if (workspaceEl) workspaceEl.setAttribute('inert', '');
    document.title = '관리자 인증 | Minlabs';
    if (pwInput) {
      pwInput.value = '';
      pwInput.focus();
    }
  }

  if (btnTogglePw && pwInput) {
    btnTogglePw.addEventListener('click', () => {
      const isPw = pwInput.type === 'password';
      pwInput.type = isPw ? 'text' : 'password';
      btnTogglePw.textContent = isPw ? '숨김' : '표시';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (checkLockoutTimer()) return;

      const entered = pwInput.value;
      const enteredHash = await sha256Hex(entered);
      if (enteredHash === getTargetHash()) {
        setLockoutState({ fails: 0, lockedUntil: 0 });
        authErrorEl.textContent = '';
        unlockWorkspace();
      } else {
        const state = getLockoutState();
        const fails = (state.fails || 0) + 1;
        if (fails >= 5) {
          setLockoutState({ fails, lockedUntil: Date.now() + 60 * 1000 });
          checkLockoutTimer();
        } else {
          setLockoutState({ fails, lockedUntil: 0 });
          authErrorEl.textContent = `비밀번호가 일치하지 않습니다. (${fails}/5회 실패)`;
          pwInput.select();
        }
      }
    });
  }

  if (btnLockAdmin) {
    btnLockAdmin.addEventListener('click', () => {
      lockWorkspace();
      showToast('관리자 페이지가 잠겼습니다.');
    });
  }

  if (btnOpenPwDialog && pwDialog) {
    btnOpenPwDialog.addEventListener('click', () => {
      newPwInput.value = '';
      pwDialog.showModal();
    });
  }

  if (btnClosePwDialog && pwDialog) {
    btnClosePwDialog.addEventListener('click', () => {
      pwDialog.close();
    });
  }

  if (pwChangeForm && pwDialog) {
    pwChangeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const val = newPwInput.value;
      if (!val || val.length < 6) return;
      const newHash = await sha256Hex(val);
      localStorage.setItem(CUSTOM_HASH_KEY, newHash);
      pwDialog.close();
      showToast('관리자 비밀번호가 변경되었습니다.');
    });
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
          <p style="font-size:15px;font-weight:650;color:var(--ink);margin-bottom:6px;">등록된 글이 없습니다.</p>
          <p style="font-size:13.5px;">우측 상단의 '+ 새 글 작성' 버튼을 눌러 글을 추가해보세요.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = list
      .map(post => {
        const typeBadge = post.type === 'review'
          ? '<span class="badge-type-review">후기</span>'
          : '<span class="badge-type-blog">블로그</span>';
        const draftBadge = post.status === 'draft'
          ? '<span class="badge-draft">임시저장</span>'
          : '';
        const featuredBadge = post.featured
          ? '<span class="badge-featured">상단 고정</span>'
          : '';
        const tagsText = (post.tags || []).map(t => `#${Store.escapeHtml(t)}`).join(' ');

        return `
          <div class="admin-post-row">
            <div class="admin-row-info">
              <div class="admin-row-badges">
                ${Store.getMiniIconHTML(post)}
                ${typeBadge}
                ${draftBadge}
                ${featuredBadge}
                <span style="font-weight:650;color:var(--ink);">${Store.escapeHtml(post.category)}</span>
              </div>
              <h3 class="admin-row-title">${Store.escapeHtml(post.title)}</h3>
              <p class="admin-row-summary">${Store.escapeHtml(Store.cleanSummary(post.summary))}</p>
              <div class="admin-row-meta">${Store.escapeHtml(post.date)} ${tagsText ? `· ${tagsText}` : ''}</div>
            </div>
            <div class="admin-row-actions">
              <button type="button" class="row-btn" data-action="edit" data-id="${Store.escapeHtml(post.id)}">수정</button>
              <button type="button" class="row-btn" data-action="feature" data-id="${Store.escapeHtml(post.id)}">상단 고정</button>
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
          showToast('목록 상단에 고정되었습니다.');
        } else if (action === 'switch-type') {
          const target = Store.getPostById(id);
          if (target) {
            target.type = target.type === 'review' ? 'blog' : 'review';
            Store.savePost(target);
            renderAdminList();
            showToast(`${target.type === 'review' ? '후기' : '블로그'} 목록으로 이동했습니다.`);
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
      .map((tag, idx) => `<span class="velog-tag-pill" data-idx="${idx}" title="클릭하여 태그 삭제">#${Store.escapeHtml(tag)} <span aria-hidden="true">×</span></span>`)
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
    const catVal = edCategory.value.trim() || (editorType === 'review' ? '후기' : 'Minlabs');
    const existing = editingId ? Store.getPostById(editingId) : null;

    return {
      id: editingId || `${editorType}-${Date.now()}`,
      type: editorType,
      status: statusOverride || 'published',
      featured: edFeatured.checked,
      category: catVal,
      iconType: edIconType.value,
      thumbnailImage: existing ? existing.thumbnailImage : '',
      summary: edSummary.value.trim(),
      title: titleVal,
      tags: currentTags.length ? currentTags.slice() : [catVal.replace(/\s+/g, '')],
      date: existing ? existing.date : undefined,
      content: edBody.value
    };
  }

  function updateLivePreview() {
    const temp = buildDraftObject('published');
    const previewPost = Object.assign({}, temp, {
      summary: Store.cleanSummary(temp.summary) ||
        `${(temp.content || '본문을 입력하면 이곳에 요약이 표시됩니다.').replace(/[#>*`]/g, '').trim().slice(0, 110)}`,
      date: temp.date || '2026.11.11'
    });

    edCardPreview.innerHTML = `
      <div class="journal-card" style="pointer-events:none;">
        ${Store.renderCardBodyInnerHTML(previewPost)}
      </div>
    `;

    edPreviewTitle.textContent = previewPost.title;
    edBodyPreview.innerHTML = Store.renderMarkdown(temp.content || '*내용을 작성하면 여기에 표시됩니다.*');
  }

  function openEditor(postId, defaultType) {
    editingId = postId || null;
    const existing = postId ? Store.getPostById(postId) : null;

    if (existing) {
      setEditorType(existing.type);
      edCategory.value = existing.category || '';
      edFeatured.checked = Boolean(existing.featured);
      edIconType.value = existing.iconType || 'compilot';
      edSummary.value = Store.cleanSummary(existing.summary || '');
      edTitle.value = existing.title || '';
      currentTags = Array.isArray(existing.tags) ? existing.tags.slice() : [];
      edBody.value = existing.content || '';
    } else {
      setEditorType(defaultType || (currentFilter === 'review' ? 'review' : 'blog'));
      edCategory.value = 'Compilot';
      edFeatured.checked = false;
      edIconType.value = 'compilot';
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
      if (window.confirm('기본 글 목록으로 초기화하시겠습니까?')) {
        Store.resetToDefaults();
        renderAdminList();
        showToast('기본 글 목록으로 복원되었습니다.');
      }
    });
  }

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

  // IME-safe Tag Input Handler
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

  function insertMarkdown(type) {
    const start = edBody.selectionStart;
    const end = edBody.selectionEnd;
    const val = edBody.value;
    const selected = val.slice(start, end);
    let replacement = '';

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
        replacement = `\n> ${selected || '인용구 내용'}\n`;
        break;
      case 'link': {
        const url = window.prompt('연결할 URL을 입력하세요:', 'https://');
        if (!url) return;
        replacement = `[${selected || '링크 텍스트'}](${url})`;
        break;
      }
      case 'image':
        edImageFile.click();
        return;
      case 'code':
        replacement = `\n\`\`\`\n${selected || '// 코드'}\n\`\`\`\n`;
        break;
      default:
        return;
    }

    edBody.value = val.slice(0, start) + replacement + val.slice(end);
    edBody.focus();
    const cursorOffset = start + replacement.length;
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

  [edTitle, edCategory, edFeatured, edIconType, edSummary, edBody].forEach(el => {
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
      showToast(`${targetName} 목록에 게시되었습니다.`);
      setTimeout(() => {
        closeEditor();
      }, 550);
    });
  }

  function initWorkspaceAfterAuth() {
    const params = new URLSearchParams(window.location.search);
    renderAdminList();
    if (params.get('edit')) {
      openEditor(params.get('edit'));
    } else if (params.get('type')) {
      openEditor(null, params.get('type'));
    }
  }

  checkLockoutTimer();
  if (Store.isAdminAuthenticated()) {
    unlockWorkspace();
  }
})();
