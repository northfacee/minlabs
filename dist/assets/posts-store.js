(function (global) {
  const STORAGE_KEY = 'minlabs_cms_posts_v5';
  const LEGACY_KEYS = ['minlabs_cms_posts_v3', 'minlabs_cms_posts_v4'];
  const AUTH_SESSION_KEY = 'minlabs_admin_session_v1';

  const ICON_SVGS = {
    leftinlife: {
      label: 'LEFT IN LIFE',
      img: '/assets/leftinlife.webp'
    },
    shashak: {
      label: '샤샥',
      img: '/assets/shashak.webp'
    },
    toepick: {
      label: 'ToePick',
      img: '/assets/toepick.webp'
    },
    immyme: {
      label: 'IMMYME',
      img: '/assets/immyme.webp'
    },
    code: {
      label: '개발 기록',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#19181e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
    },
    note: {
      label: '노트',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#19181e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>'
    },
    review: {
      label: '후기',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#19181e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    },
    map: {
      label: '산책',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#19181e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
    }
  };
  // Backward-compatible aliases
  ICON_SVGS.ai = ICON_SVGS.note;
  ICON_SVGS.star = ICON_SVGS.review;

  const DEFAULT_POSTS = [
    // ==================== BLOG POSTS ====================
    {
      id: 'blog-leftinlife-time-units',
      type: 'blog',
      status: 'published',
      featured: true,
      category: 'LEFT IN LIFE',
      iconType: 'leftinlife',
      title: 'LEFT IN LIFE 제작기: 남은 시간을 막연한 연도 대신 일상의 횟수로 보여주기',
      summary: '기대수명에서 수면·일·스마트폰 사용 시간을 덜어낸 뒤, 실제로 내가 쓸 수 있는 자유 시간이 몇 번의 봄과 주말로 남았는지 차분하게 계산해보는 웹 서비스입니다.',
      tags: ['LEFTINLIFE', '시간시각화', '웹서비스'],
      date: '2026.11.06',
      readMin: 5,
      content: `## "앞으로 50년 남았다"는 말은 생각보다 실감이 나지 않는다

남은 인생을 연(year)이나 일(day) 단위로만 보면 숫자가 너무 커서 오히려 무감각해집니다. 하지만 그 시간에서 잠자는 시간, 일하는 시간, 무심코 화면을 넘기는 시간을 빼보면 이야기가 달라집니다.

[LEFT IN LIFE](https://leftinlife.com/)는 불안감을 주기 위해서가 아니라, **실제로 내 마음대로 쓸 수 있는 자유 시간의 윤곽**을 또렷하게 보려고 만든 작은 계산기입니다.

## 숫자보다 체감되는 일상 단위로 바꾸기

생년월일과 하루 평균 수면·노동·화면 시간을 넣으면 두 가지를 나란히 보여줍니다.

1. 물리적으로 남은 전체 시간과 필수 활동을 뺀 **실제 자유 시간**
2. 앞으로 맞이할 봄, 함께할 수 있는 주말, 여행, 식사처럼 **손에 잡히는 일상의 횟수**

한국어뿐 아니라 영어·스페인어·일본어 브라우저에서도 별도 설정 없이 바로 열리도록 가벼운 정적 웹으로 구성했습니다.`
    },
    {
      id: 'blog-shashak-squirrel-routine',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '샤샥',
      iconType: 'shashak',
      title: '샤샥 제작기: 밀린 할 일 경고 대신 도토리 하나씩 모으는 로컬 우선 투두 앱',
      summary: '오늘·매일·주기·달력 네 가지 탭으로 할 일과 루틴의 성격을 나누고, 회원가입 없이 앱을 열자마자 바로 기록할 수 있게 설계한 이유를 정리했습니다.',
      tags: ['샤샥', '투두앱', '오프라인퍼스트'],
      date: '2026.10.24',
      readMin: 6,
      content: `## 밀린 할 일 목록이 숙제처럼 느껴지지 않으려면

투두 앱을 쓰다 보면 이틀만 바빠도 빨간색 '지남' 표시가 쌓여 앱을 열기 싫어지곤 합니다. [샤샥(shashak)](https://shashak.app/)을 만들 때는 다그치는 알림 대신, 오늘 해낸 만큼만 조용히 도토리가 쌓이는 구조를 택했습니다.

## 성격이 다른 할 일을 네 탭으로 분리

* **오늘**: 오늘 처리할 단발성 할 일과 현재 모은 도토리 확인
* **매일**: 물 마시기나 스트레칭처럼 매일 반복하는 기본 습관(체크형 및 횟수형 지원)
* **주기**: 격일 운동이나 완료일 기준 N일 뒤 반복처럼 리듬이 있는 일정
* **달력**: 지나간 날들의 기록을 돌아보는 월간 뷰

## 로그인 강제 없는 로컬 우선 저장

처음 앱을 켰을 때 로그인 화면이 가로막지 않도록 기기 내 SQLite에 먼저 저장합니다. 원할 때만 계정을 연결해 기기 간 동기화를 켜면 기존 게스트 기록과 도토리가 그대로 합쳐집니다.`
    },
    {
      id: 'blog-toepick-retention-loop',
      type: 'blog',
      status: 'published',
      featured: false,
      category: 'ToePick',
      iconType: 'toepick',
      title: 'ToePick 설계 노트: 문제 풀이 뒤에 해설과 단어 복습을 한 흐름으로 붙이기',
      summary: '문제집 탭, 오답 탭, 단어장 탭을 따로 오가느라 중간에 앱을 닫게 되던 불편함을 줄이기 위해 한 세트를 짧게 끝내는 단일 학습 동선을 만들었습니다.',
      tags: ['ToePick', '토익학습', '제품설계'],
      date: '2026.10.23',
      readMin: 5,
      content: `## 탭이 나뉘면 복습 전에 앱을 닫게 된다

이동 중에 토익 문제를 풀려고 앱을 열었다가도, 채점 후 오답 해설을 보러 다른 메뉴로 이동하고 단어장을 또 따로 열어야 하면 금세 피로해집니다.

[ToePick](https://toepick.minlabs.app/)에서는 학습 단위를 잘게 쪼개고 화면 이동을 최소화하는 데 집중했습니다.

\`\`\`
한 문제 풀이 ──> 바로 아래 핵심 해설 확인 ──> 문항 속 어휘 북마크 및 복습
\`\`\`

## 자투리 시간에 맞춘 Part 2·3·4와 Part 5 구성

긴 독해 지문을 스크롤하기 어려운 지하철·버스 환경을 고려해, 귀로 집중하는 **LC Part 2·3·4**와 짧은 문장 구조를 빠르게 판단하는 **RC Part 5** 중심으로 한 호흡의 세트를 구성했습니다.`
    },
    {
      id: 'blog-immyme-mood-recommendation',
      type: 'blog',
      status: 'published',
      featured: false,
      category: 'IMMYME',
      iconType: 'immyme',
      title: 'IMMYME 개발기: 평점 순 정렬 대신 오늘 기분과 걷는 속도를 먼저 묻는 이유',
      summary: '유명한 맛집 랭킹이 아니라 지금 기분과 산책 리듬에 어울리는 주변 공간을 찾기 위해 설치 없는 모바일 웹을 선택한 이야기입니다.',
      tags: ['IMMYME', '장소추천', '모바일웹'],
      date: '2026.10.21',
      readMin: 5,
      content: `## "어디 갈까?" 싶을 때 마땅한 검색어가 떠오르지 않는 순간

지도 앱을 켜도 검색창에 결국 '근처 카페'만 치게 될 때가 많습니다. 꼭 유명한 곳을 가고 싶다기보다 지금 기분에 맞는 조용한 골목이나 산책 코스가 필요할 때를 위해 [IMMYME](https://immyme.com/)를 만들었습니다.

## 앱 설치 없이 브라우저에서 바로 열기

잠시 시간이 비어 걸을 곳을 찾는데 앱스토어에서 새 앱을 설치하는 사람은 드뭅니다. 모바일 브라우저에서 링크를 열자마자 오늘 기분과 걷기 취향을 고르고, 현재 위치나 원하는 동네 주변 장소를 바로 둘러볼 수 있게 구성했습니다.`
    },
    {
      id: 'blog-zero-framework-speed',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '아키텍처',
      iconType: 'code',
      title: '프레임워크 없이 HTML과 CSS만으로 가볍게 운영하는 프로젝트 허브',
      summary: '빌드 파이프라인과 무거운 번들을 덜어내고 시맨틱 마크업, WebP 아이콘, 최소한의 스크립트만으로 한·영 소개 페이지를 구성했습니다.',
      tags: ['웹표준', '정적사이트', '성능최적화'],
      date: '2026.10.18',
      readMin: 4,
      content: `## 소개 페이지는 누르는 즉시 열려야 한다

여러 사이드 프로젝트를 한곳에 모아두는 허브 사이트까지 복잡한 프레임워크에 묶여 있을 필요는 없었습니다. \`minlabs.app\`은 별도 번들러 없이 정적 HTML과 CSS를 그대로 서빙합니다.

* **경량 이미지 자산**: 앱 아이콘을 \`<picture>\`와 WebP 포맷으로 제공해 첫 화면 로딩 지연을 줄였습니다.
* **즉각적인 한·영 전환**: 유휴 시간에 반대 언어 마크업을 미리 받아두어 페이지 새로고침 깜빡임 없이 전환됩니다.
* **구조화 데이터와 \`llms.txt\`**: 검색엔진과 AI 에이전트 모두 각 프로젝트의 성격을 정확히 읽을 수 있도록 JSON-LD와 텍스트 명세를 함께 유지합니다.`
    },
    {
      id: 'blog-korean-ime-ux',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '프론트엔드',
      iconType: 'code',
      title: '한국어 입력창에서 Enter 키가 두 번 눌리거나 마지막 글자가 잘리는 IME 문제 다루기',
      summary: '한글 조합 중 Enter 이벤트 처리 시 흔히 겪는 isComposing 및 keyCode 229 이슈와 방어 코드를 간단히 정리했습니다.',
      tags: ['프론트엔드', '한글IME', '입력UX'],
      date: '2026.10.12',
      readMin: 4,
      content: `## 한글 조합이 끝나기 전에 발생하는 keydown

태그 입력창에 \`토익\`을 치고 \`Enter\`를 눌렀을 때 마지막 글자인 \`익\`이 다음 줄에 남거나 두 번 등록되는 현상은 브라우저의 IME 조합 이벤트 순서 때문에 발생합니다.

\`\`\`js
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    addTag(input.value);
  }
});
\`\`\`

조합 중(\`isComposing\`)일 때는 제출 동작을 건너뛰도록 한 줄만 챙겨도 한국어 입력 경험이 훨씬 자연스러워집니다.`
    },

    // ==================== REVIEW / USAGE POSTS ====================
    {
      id: 'review-leftinlife-perspective',
      type: 'review',
      status: 'published',
      featured: true,
      category: 'LEFT IN LIFE',
      iconType: 'leftinlife',
      title: '남은 주말과 계절 횟수를 숫자로 보고 나니 하루 쓰임새를 다시 생각하게 됐어요',
      summary: '수면과 업무, 습관적인 화면 시간을 뺀 진짜 자유 시간을 일상 단위로 확인해보고 저녁 루틴을 조금씩 바꾼 후기입니다.',
      tags: ['LEFTINLIFE', '자유시간', '일상회고'],
      date: '2026.11.07',
      readMin: 4,
      content: `## 막연했던 시간이 구체적인 횟수로 바뀔 때

하루에 스마트폰을 보는 시간을 조금 줄여야겠다고 생각만 하다가 LEFT IN LIFE에 평소 수면 시간과 근무 시간, 스크린타임을 그대로 넣어봤습니다.

전체 남은 날수보다도, 필수 시간을 제하고 남은 자유 시간과 앞으로 보낼 수 있는 봄·여행의 횟수가 나란히 보이니 훨씬 차분하게 와닿았습니다. 거창한 결심 대신 퇴근 후 무의식적으로 쇼츠를 넘기던 30분만 덜어내 보기로 했습니다.`
    },
    {
      id: 'review-shashak-daily-acorn',
      type: 'review',
      status: 'published',
      featured: false,
      category: '샤샥',
      iconType: 'shashak',
      title: '로그인 없이 바로 적고 도토리를 모으니 사소한 생활 루틴도 덜 미루게 돼요',
      summary: '복잡한 플래너 설정 대신 오늘 할 일과 주기 반복 루틴만 가볍게 나누어 쓰고 홈 화면 위젯으로 체크하며 정착한 이야기입니다.',
      tags: ['샤샥', '루틴관리', '위젯활용'],
      date: '2026.10.24',
      readMin: 4,
      content: `## 설정하느라 지치지 않는 단순함이 좋았습니다

노션이나 복잡한 일정 앱은 처음 틀을 만들 때는 뿌듯하지만, 바쁜 주간이 오면 기록 자체가 일이 되곤 했습니다. 샤샥은 앱을 열자마자 아무 가입 절차 없이 오늘 할 일을 바로 적을 수 있어 첫 진입이 가벼웠습니다.

매일 하는 습관(비타민 챙기기, 물 마시기)과 3일마다 돌아오는 집안일을 '매일' 탭과 '주기' 탭에 따로 넣어두니 오늘 목록이 지저분해지지 않았고, 홈 화면 위젯에서 바로 체크할 때마다 도토리가 하나씩 쌓이는 소소한 손맛 덕분에 꾸준히 쓰고 있습니다.`
    },
    {
      id: 'review-toepick-commute-loop',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'ToePick',
      iconType: 'toepick',
      title: '출퇴근 지하철 15분, 문제 풀고 헷갈린 단어까지 한 흐름으로 넘기는 루틴',
      summary: '책상에 오래 앉기 어려운 평일에 아침에는 LC 듣기 감각을 유지하고 퇴근길에는 낮에 저장해둔 단어를 가볍게 복습한 활용기입니다.',
      tags: ['ToePick', '출퇴근공부', '토익복습'],
      date: '2026.10.22',
      readMin: 4,
      content: `## 두꺼운 수험서를 펼치지 못하는 날의 대안

평일 저녁에는 피곤해서 각 잡고 모의고사 한 회를 풀기가 쉽지 않았습니다. 대신 지하철에서 이어폰을 끼고 ToePick으로 Part 2·3 짧은 듣기 문항과 Part 5 문법 문제를 몇 개씩 푸는 습관을 들였습니다.

문제를 푼 직후 같은 흐름에서 해설을 읽고 모르는 어휘를 바로 담아둘 수 있어서, 내리기 직전까지 끊기지 않고 한 세트를 마무리할 수 있는 점이 가장 실용적이었습니다.`
    },
    {
      id: 'review-immyme-weekend-walk',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'IMMYME',
      iconType: 'immyme',
      title: '약속 시간 한 시간 남았을 때 검색어 고민 없이 동네 산책 코스 고르기',
      summary: '늘 가던 대형 카페 대신 그날 기분과 걷고 싶은 거리에 맞춰 큰길 뒤편의 조용한 책방과 산책로를 발견한 사용기입니다.',
      tags: ['IMMYME', '동네산책', '모바일웹'],
      date: '2026.10.20',
      readMin: 4,
      content: `## 무엇을 검색할지 모를 때 가볍게 열기 좋은 웹페이지

주말 오후에 약속 시간까지 애매하게 한 시간쯤 비었을 때 브라우저에서 바로 IMMYME를 열어봤습니다. 따로 앱을 받지 않아도 되고, '차분하게 걷고 싶은 기분'처럼 지금 상태만 고르면 주변 후보를 추려주어 결정하기가 한결 수월했습니다.

광고성 리뷰를 길게 스크롤하지 않고도 평소 지나치던 골목 안쪽의 작은 공간들을 발견할 수 있어 날씨가 좋은 날 종종 열어보고 있습니다.`
    }
  ];

  // Clean up legacy visitor cache if present
  try {
    LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
  } catch (e) {}

  function isAdminAuthenticated() {
    try {
      const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.expiresAt || Date.now() > data.expiresAt) {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function cleanSummary(str) {
    return String(str || '').replace(/^핵심\s*요약[:\s]*/i, '').trim();
  }

  function loadAllPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read posts from localStorage:', e);
    }
    return DEFAULT_POSTS.map(p => Object.assign({}, p));
  }

  function saveAllPosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage:', e);
    }
  }

  function resetToDefaults() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return DEFAULT_POSTS.map(p => Object.assign({}, p));
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function stripMarkdown(md) {
    return String(md || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^[#>*\-+\d.]+\s+/gm, '')
      .replace(/[*_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function calcReadMinutes(content) {
    const plain = stripMarkdown(content);
    const chars = plain.length;
    return Math.max(2, Math.min(30, Math.round(chars / 180) || 4));
  }

  function formatTodayDot() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }

  function resolveIconKey(post) {
    if (post.iconType && ICON_SVGS[post.iconType]) return post.iconType;
    const catLower = (post.category || '').toLowerCase();
    if (catLower.includes('left')) return 'leftinlife';
    if (catLower.includes('shashak') || catLower.includes('샤샥')) return 'shashak';
    if (catLower.includes('toe') || catLower.includes('토픽')) return 'toepick';
    if (catLower.includes('immy')) return 'immyme';
    return post.type === 'review' ? 'review' : 'note';
  }

  function getMiniIconHTML(post) {
    const key = resolveIconKey(post);
    const item = ICON_SVGS[key] || ICON_SVGS.note;
    if (item.img) {
      return `<span class="journal-mini-icon" aria-hidden="true"><img src="${escapeHtml(item.img)}" alt="" width="22" height="22" loading="lazy"></span>`;
    }
    return `<span class="journal-mini-icon" aria-hidden="true">${item.svg}</span>`;
  }

  function renderCardBodyInnerHTML(post) {
    const coverHtml = post.thumbnailImage
      ? `<div class="journal-card-cover"><img src="${escapeHtml(post.thumbnailImage)}" alt="" loading="lazy"></div>`
      : '';
    const tagsHtml = (post.tags || [])
      .slice(0, 3)
      .map(t => `<span class="journal-tag-chip">#${escapeHtml(t)}</span>`)
      .join('');
    const cat = escapeHtml(post.category || (post.type === 'review' ? '후기' : '기록'));
    const dateStr = escapeHtml(post.date || '');
    const summaryStr = escapeHtml(cleanSummary(post.summary));

    return `
      ${coverHtml}
      <div class="journal-card-body">
        <div class="journal-card-top">
          ${getMiniIconHTML(post)}
          <span class="journal-cat-label">${cat}</span>
          ${dateStr ? `<span class="journal-meta-dot" aria-hidden="true">·</span><span class="journal-date-text">${dateStr}</span>` : ''}
        </div>
        <h2 class="journal-card-title">${escapeHtml(post.title)}</h2>
        <p class="journal-card-summary">${summaryStr}</p>
        <div class="journal-card-footer">
          <div class="journal-card-tags">${tagsHtml}</div>
          <span class="journal-read-cue">읽기 <span aria-hidden="true">↗</span></span>
        </div>
      </div>
    `;
  }

  function renderMarkdown(md) {
    const lines = String(md || '').split('\n');
    let html = '';
    let inCode = false;
    let codeBuf = [];
    let inList = false;

    function closeList() {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
    }

    function formatInline(text) {
      let s = escapeHtml(text);
      s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="post-inline-img">');
      s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
      s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
      return s;
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('```')) {
        closeList();
        if (!inCode) {
          inCode = true;
          codeBuf = [];
        } else {
          html += `<pre tabindex="0"><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
          inCode = false;
        }
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        continue;
      }
      const trimmed = line.trim();
      if (!trimmed) {
        closeList();
        continue;
      }
      if (trimmed.startsWith('#### ')) {
        closeList();
        html += `<h4>${formatInline(trimmed.slice(5))}</h4>`;
      } else if (trimmed.startsWith('### ')) {
        closeList();
        html += `<h3>${formatInline(trimmed.slice(4))}</h3>`;
      } else if (trimmed.startsWith('## ')) {
        closeList();
        html += `<h2>${formatInline(trimmed.slice(3))}</h2>`;
      } else if (trimmed.startsWith('# ')) {
        closeList();
        html += `<h1>${formatInline(trimmed.slice(2))}</h1>`;
      } else if (trimmed.startsWith('> ')) {
        closeList();
        html += `<blockquote><p>${formatInline(trimmed.slice(2))}</p></blockquote>`;
      } else if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        const itemText = trimmed.replace(/^([-*]|\d+\.)\s+/, '');
        html += `<li>${formatInline(itemText)}</li>`;
      } else {
        closeList();
        html += `<p>${formatInline(trimmed)}</p>`;
      }
    }
    closeList();
    if (inCode && codeBuf.length) {
      html += `<pre tabindex="0"><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`;
    }
    return html;
  }

  function getPosts(options) {
    const opts = options || {};
    let list = loadAllPosts();
    if (opts.type && opts.type !== 'all') {
      list = list.filter(p => p.type === opts.type);
    }
    if (!opts.includeDrafts) {
      list = list.filter(p => p.status !== 'draft');
    }
    if (opts.tag && opts.tag !== '전체') {
      const t = opts.tag.toLowerCase();
      list = list.filter(p =>
        (p.category && p.category.toLowerCase() === t) ||
        (Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase() === t))
      );
    }
    if (opts.query) {
      const q = opts.query.toLowerCase().trim();
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.summary && p.summary.toLowerCase().includes(q)) ||
        (p.content && p.content.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }
    list.sort((a, b) => {
      if (Boolean(b.featured) !== Boolean(a.featured)) {
        return b.featured ? 1 : -1;
      }
      return String(b.date || '').localeCompare(String(a.date || ''));
    });
    return list;
  }

  function getPostById(id) {
    const list = loadAllPosts();
    return list.find(p => p.id === id) || null;
  }

  function savePost(input) {
    const list = loadAllPosts();
    const nowDate = input.date || formatTodayDot();
    const plain = stripMarkdown(input.content || '');
    const defaultSummary = plain
      ? `${plain.slice(0, 120)}${plain.length > 120 ? '...' : ''}`
      : '새로 작성된 기록입니다.';
    const summaryText = input.summary && cleanSummary(input.summary)
      ? cleanSummary(input.summary)
      : defaultSummary;

    const postObj = {
      id: input.id || `${input.type || 'blog'}-${Date.now()}`,
      type: input.type === 'review' ? 'review' : 'blog',
      status: input.status === 'draft' ? 'draft' : 'published',
      featured: Boolean(input.featured),
      category: (input.category || (input.type === 'review' ? '후기' : 'Minlabs')).trim(),
      iconType: input.iconType || resolveIconKey(input),
      thumbnailImage: input.thumbnailImage || '',
      title: (input.title || '제목 없는 글').trim(),
      summary: summaryText,
      tags: Array.isArray(input.tags) && input.tags.length ? input.tags : [(input.category || 'Minlabs').replace(/\s+/g, '')],
      date: nowDate,
      readMin: input.readMin || calcReadMinutes(input.content || ''),
      content: input.content || ''
    };

    if (postObj.featured) {
      list.forEach(p => {
        if (p.type === postObj.type && p.id !== postObj.id) {
          p.featured = false;
        }
      });
    }

    const idx = list.findIndex(p => p.id === postObj.id);
    if (idx >= 0) {
      list[idx] = postObj;
    } else {
      list.unshift(postObj);
    }
    saveAllPosts(list);
    return postObj;
  }

  function deletePost(id) {
    const list = loadAllPosts().filter(p => p.id !== id);
    saveAllPosts(list);
    return list;
  }

  function setFeaturedPost(id) {
    const list = loadAllPosts();
    const target = list.find(p => p.id === id);
    if (!target) return null;
    list.forEach(p => {
      if (p.type === target.type) {
        p.featured = (p.id === id);
      }
    });
    saveAllPosts(list);
    return target;
  }

  // Hidden owner shortcut: Cmd+Shift+A / Ctrl+Shift+A navigates to /admin.html
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      window.location.href = '/admin.html';
    }
  });

  global.MinlabsStore = {
    loadAllPosts,
    saveAllPosts,
    resetToDefaults,
    getPosts,
    getPostById,
    savePost,
    deletePost,
    setFeaturedPost,
    getMiniIconHTML,
    renderCardBodyInnerHTML,
    renderMarkdown,
    escapeHtml,
    cleanSummary,
    calcReadMinutes,
    isAdminAuthenticated,
    AUTH_SESSION_KEY
  };
})(window);
