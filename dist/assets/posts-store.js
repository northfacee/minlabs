(function (global) {
  const STORAGE_KEY = 'minlabs_cms_posts_v3';
  const AUTH_SESSION_KEY = 'minlabs_admin_session_v1';

  const ICON_SVGS = {
    toepick: {
      label: 'ToePick',
      img: '/assets/toepick.webp'
    },
    immyme: {
      label: 'IMMYME',
      img: '/assets/immyme.webp'
    },
    shashak: {
      label: '샤샥',
      img: '/assets/shashak.webp'
    },
    ai: {
      label: 'AI Lab',
      svg: '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M24 5L28.5 18.5L42 23L28.5 27.5L24 41L19.5 27.5L6 23L19.5 18.5L24 5Z" fill="#6435ee" stroke="#19181e" stroke-width="2.5"/><circle cx="37" cy="11" r="4" fill="#ff49a5" stroke="#19181e" stroke-width="2"/></svg>'
    },
    code: {
      label: 'DevLog',
      svg: '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M16 14L6 24L16 34M32 14L42 24L32 34M27 10L21 38" stroke="#19181e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    star: {
      label: 'Review',
      svg: '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M24 6L29.4 17.2L41.8 19L32.8 27.7L34.9 40L24 34.2L13.1 40L15.2 27.7L6.2 19L18.6 17.2L24 6Z" fill="#d5ff45" stroke="#19181e" stroke-width="2.8" stroke-linejoin="round"/></svg>'
    },
    map: {
      label: 'Walk',
      svg: '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path d="M24 42C24 42 38 30.4 38 19C38 11.3 31.7 5 24 5C16.3 5 10 11.3 10 19C10 30.4 24 42 24 42Z" fill="#ff49a5" stroke="#19181e" stroke-width="2.8"/><circle cx="24" cy="19" r="5.5" fill="#fff" stroke="#19181e" stroke-width="2.2"/></svg>'
    }
  };

  const DEFAULT_POSTS = [
    // ==================== BLOG POSTS ====================
    {
      id: 'blog-shashak-squirrel-routine',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '샤샥',
      subLabel: '루틴 설계 · 오프라인 퍼스트',
      bannerLine1: '딱딱한 체크리스트 대신,',
      bannerHighlight: '다람쥐와 도토리 보상으로',
      bannerLine2: '지속하는 하루 루틴',
      iconType: 'shashak',
      themeColor: 'cream',
      title: '샤샥(shashak) 제작기: 죄책감 없는 루틴과 도토리 보상으로 매일 열고 싶은 투두 앱 만들기',
      summary: '핵심 요약 오늘·매일·주기·달력의 네 가지 흐름으로 할 일과 반복 루틴을 나누고, 로그인 없이도 오프라인에서 즉시 기록하며 도토리 보상을 모으는 샤샥의 설계 배경을 소개합니다.',
      tags: ['샤샥', '투두앱', '루틴관리'],
      date: '2026.10.24',
      readMin: 7,
      views: 1290,
      content: `## 밀린 할 일 목록이 스트레스가 되지 않으려면?

많은 투두 앱이 처음 며칠은 의욕적으로 채워지지만, 하루이틀 바빠서 체크를 놓치면 **밀린 할 일 경고**가 쌓여 결국 앱을 열지 않게 됩니다.

Minlabs에서 [샤샥(shashak)](https://shashak.app/)을 만들며 집중한 질문은 단순했습니다.

> "오늘 할 일과 반복 루틴을 도토리처럼 차곡차곡 모으는 따뜻한 경험으로 바꿀 수 없을까?"

### 1. 오늘 · 매일 · 주기 · 달력의 명확한 역할 분리

* **오늘**: 오늘 집중할 할 일과 다람쥐 파트너, 보유 도토리 현황을 한눈에 확인
* **매일**: 기상, 물 마시기, 스트레칭처럼 매일 이어가는 기본 습관
* **주기**: 요일별 운동이나 주 3회 독서처럼 나만의 리듬으로 반복되는 루틴
* **달력**: 날짜별 실행 기록과 흐름을 차분하게 돌아보는 아카이브

### 2. 로그인 없이 바로 시작하는 로컬 우선 아키텍처

앱을 처음 켜자마자 회원가입 화면으로 가로막지 않습니다. 기기 내부 SQLite 저장소에 즉시 기록되고, 나중에 계정을 연결하면 게스트 시절에 모은 할 일과 도토리 보상이 안전하게 병합됩니다.`
    },
    {
      id: 'blog-toepick-retention-loop',
      type: 'blog',
      status: 'published',
      featured: true,
      category: 'ToePick',
      subLabel: '제품 설계 · 학습 루프',
      bannerLine1: '문제만 풀던 토익 앱,',
      bannerHighlight: '해설·단어 복습 연결로',
      bannerLine2: '완주율 3.2배 높이다',
      iconType: 'toepick',
      themeColor: 'mint',
      title: 'ToePick 학습 루프 재설계: 문제 풀이에서 단어 복습까지 끊기지 않는 구조',
      summary: '핵심 요약 토익 LC·RC 문제를 푼 직후 오답 해설과 핵심 어휘 복습을 한 화면 흐름으로 이어 붙였습니다. 자투리 5분 안에 한 세트를 끝내는 마이크로 학습 구조를 소개합니다.',
      tags: ['ToePick', '토익LC·RC', '프로덕트디자인'],
      date: '2026.10.23',
      readMin: 8,
      views: 1420,
      content: `## 왜 기존 토익 앱은 3일 만에 닫히게 될까?

출퇴근 지하철에서 토익 문제를 풀려고 앱을 열었다가, **긴 지문과 복잡한 메뉴** 때문에 2분 만에 닫은 경험이 한 번쯤 있으실 겁니다.

Minlabs에서 [ToePick](https://toepick.minlabs.app/)을 만들며 가장 먼저 정의한 문제는 명확했습니다.

> "하루 10분, 듣기(LC)와 독해(RC) 감각을 잃지 않게 돕는 가장 가벼운 학습 루프는 무엇일까?"

### 1. 문제 풀이 → 해설 → 단어 복습의 단일 흐름

기존 학습 도구들은 **문제집 탭**, **오답노트 탭**, **단어장 탭**이 모두 분리되어 있었습니다. 탭이 나뉘면 사용자는 문제를 채점한 뒤 바로 앱을 이탈합니다.

\`\`\`
[기존 방식] 문제 풀이 ──(이탈)──> 오답 확인 ──(이탈)──> 단어장 이동
[ToePick]  한 문제 Pick ──> 즉시 핵심 해설 ──> 문항 속 필수 어휘 북마크
\`\`\`

### 2. Part 2·3·4 듣기와 Part 5 문법의 균형

* **Listening (Part 2 · 3 · 4)**: 짧은 질의응답부터 대화문까지 귀가 트이는 핵심 패턴 집중 훈련
* **Reading (Part 5)**: 문장 구조와 빈출 어휘를 30초 안에 판단하는 실전 감각 유지

### 3. 다음 실험 과제

앞으로도 ToePick은 화려한 기능 추가보다 **매일 다시 열게 되는 마찰 없는 학습 경험**을 다듬는 데 집중할 예정입니다.`
    },
    {
      id: 'blog-immyme-mood-recommendation',
      type: 'blog',
      status: 'published',
      featured: false,
      category: 'IMMYME',
      subLabel: '위치 기반 · 추천 알고리즘',
      bannerLine1: '검색어 없이 찾는 동네,',
      bannerHighlight: '기분 3초 선택으로',
      bannerLine2: '갈 곳을 골라준다면?',
      iconType: 'immyme',
      themeColor: 'purple',
      title: 'IMMYME 개발기: 평점 순 정렬 대신 ‘오늘의 기분과 걷기 취향’을 묻는 이유',
      summary: '핵심 요약 유명한 맛집 랭킹이 아니라 지금 내 기분과 걸음걸이 속도에 어울리는 주변 장소를 추천하기 위해 모바일 웹 인터페이스를 선택한 과정을 정리했습니다.',
      tags: ['IMMYME', '장소추천', '모바일웹'],
      date: '2026.10.21',
      readMin: 6,
      views: 980,
      content: `## "오늘 어디 가지?"라는 질문에는 검색어가 없다

지도 앱을 켜도 검색창에 무엇을 입력해야 할지 막막할 때가 있습니다. 맛집을 찾는 게 아니라 **그저 지금 기분에 맞는 동네 산책 코스와 공간**이 필요할 때입니다.

### 설치 없는 모바일 웹을 선택한 이유

갑자기 산책하고 싶을 때 앱스토어에서 100MB짜리 앱을 내려받는 사람은 없습니다. [IMMYME](https://immyme.com/)는 브라우저 주소창에서 바로 열리고, 위치 권한을 허용하거나 원하는 동네를 고르면 즉시 추천이 시작됩니다.

> "GO WHERE YOU FEEL. 오늘, 어디로 가볼까?"

1. **오늘의 기분 선택**: 차분한 휴식, 가벼운 환기, 새로운 영감 등 감정 상태 선택
2. **걷기 취향 반영**: 가깝고 조용한 골목부터 활기찬 산책로까지 이동 반경 설정
3. **맞춤 장소 카드 제시**: 지금 바로 발걸음을 옮길 수 있는 공간 큐레이션`
    },
    {
      id: 'blog-seo-geo-optimization',
      type: 'blog',
      status: 'published',
      featured: false,
      category: 'AI · GEO',
      subLabel: '검색 최적화 · llms.txt',
      bannerLine1: '구글 검색을 넘어,',
      bannerHighlight: 'AI 에이전트가 인용하는',
      bannerLine2: '웹사이트 구조 만들기',
      iconType: 'ai',
      themeColor: 'lime',
      title: '2026년 개인 프로젝트 실험실의 SEO와 GEO(생성형 엔진 최적화) 실전 적용기',
      summary: '핵심 요약 전통적인 메타 태그·오픈그래프 최적화에 더해 ChatGPT, Perplexity, Gemini가 사이트 정보를 정확히 읽어가도록 llms.txt와 JSON-LD 그래프를 구축했습니다.',
      tags: ['GEO', 'SEO', 'llms.txt'],
      date: '2026.10.20',
      readMin: 11,
      views: 1150,
      content: `## 검색창에 키워드를 치는 시대에서 AI에게 묻는 시대로

이제 사용자들은 "토익 LC RC 가볍게 공부하는 앱 추천해줘" 혹은 "기분에 따라 산책 장소 추천해주는 웹서비스 알려줘"라고 생성형 AI에게 직접 질문합니다.

### Minlabs가 적용한 3가지 핵심 전략

* **\`/llms.txt\` 및 \`/llms-full.txt\` 제공**: LLM 크롤러가 HTML 노이즈 없이 서비스의 핵심 정의와 FAQ를 마크다운으로 즉시 파악하도록 구성했습니다.
* **JSON-LD \`@graph\` 연결**: \`Organization\`, \`WebSite\`, \`MobileApplication\`, \`WebApplication\`, \`FAQPage\`를 단일 지식 그래프로 묶었습니다.
* **초경량 리소스 최적화**: 1.1MB에 달하던 원본 PNG 아이콘을 12KB WebP로 경량화하여 LCP를 단축했습니다.`
    },
    {
      id: 'blog-zero-framework-speed',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '아키텍처',
      subLabel: '웹 퍼포먼스 · 경량화',
      bannerLine1: '번들 크기 0KB에 도전,',
      bannerHighlight: '로딩 0.2초 만에 뜨는',
      bannerLine2: '랜딩 페이지의 비밀',
      iconType: 'code',
      themeColor: 'cream',
      title: '무거운 프레임워크 없이 네이티브 웹 표준만으로 쾌적한 프로덕트 허브 구축하기',
      summary: '핵심 요약 불필요한 외부 폰트와 대형 번들을 덜어내고 시맨틱 HTML, 네이티브 아코디언, 최적화된 WebP 자산만으로 첫 화면 렌더링 속도를 극대화했습니다.',
      tags: ['웹성능', '시맨틱HTML', 'CoreWebVitals'],
      date: '2026.10.18',
      readMin: 9,
      views: 840,
      content: `## 빠름 자체가 최고의 사용자 경험이다

개인 프로젝트 실험실의 홈페이지는 방문자가 클릭한 순간 지연 없이 바로 열려야 합니다.

### 네이티브 웹 플랫폼 기능 적극 활용

1. **\`<details name="faq">\`**: 별도의 아코디언 스크립트 없이도 하나를 열면 다른 항목이 닫히는 배타적 아코디언 구현
2. **\`<picture>\` + \`fetchpriority="high"\`**: 핵심 시각 요소를 최우선 네트워크 우선순위로 로드
3. **모션 줄이기(\`prefers-reduced-motion\`) 대응**: 접근성과 시각적 생동감을 동시에 충족`
    },
    {
      id: 'blog-small-ideas-experiment',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '실험실 노트',
      subLabel: 'Minlabs 철학 · 메이커 로그',
      bannerLine1: '거창한 기획서 대신',
      bannerHighlight: '48시간 안에 동작하는',
      bannerLine2: '프로토타입부터 만든다',
      iconType: 'ai',
      themeColor: 'pink',
      title: '작은 아이디어를 일상에 가까이: Minlabs가 아이디어를 실제 앱으로 검증하는 법',
      summary: '핵심 요약 머릿속에 떠오른 작은 불편함을 일주일 안에 실제 동작하는 웹·모바일 서비스로 출시하고 사용자 반응을 통해 개선하는 실험실 워크플로우를 공유합니다.',
      tags: ['Minlabs', '메이커로그', '사이드프로젝트'],
      date: '2026.10.15',
      readMin: 7,
      views: 760,
      content: `## 아이디어는 실행될 때만 가치가 생긴다

Minlabs는 **"궁금하거나 흥미있는 아이디어가 떠오르면 바로 실행해보는 개인 프로젝트 실험실"**입니다.

완벽한 기획서를 쓰기보다 실제로 눌러볼 수 있는 화면을 먼저 만들고, 일상 속에서 직접 써보며 진짜 필요한 기능만 남깁니다.`
    },
    {
      id: 'blog-korean-ime-ux',
      type: 'blog',
      status: 'published',
      featured: false,
      category: '프론트엔드',
      subLabel: '브라우저 호환성 · UX 디테일',
      bannerLine1: '한글 입력 중 엔터를 치면',
      bannerHighlight: '마지막 글자가 잘리는',
      bannerLine2: 'Safari IME 버그 해결기',
      iconType: 'code',
      themeColor: 'mint',
      title: '한국어 태그·검색 입력창에서 Enter 이벤트가 두 번 발생하거나 글자가 잘리는 현상 해결',
      summary: '핵심 요약 한국어·일본어 IME 조합 중 Enter 키 처리 시 발생하는 isComposing 및 keyCode 229 이슈를 방어하여 매끄러운 에디터 태그 입력을 구현했습니다.',
      tags: ['프론트엔드', '한글IME', '에디터구현'],
      date: '2026.10.12',
      readMin: 5,
      views: 690,
      content: `## 한글 입력기(IME)와 Enter 키의 미묘한 타이밍

태그 입력창에 \`토익\`을 입력하고 \`Enter\`를 눌렀을 때 \`토\`와 \`익\`이 분리되거나 중복 입력되는 현상은 대표적인 IME 이벤트 충돌입니다.

\`\`\`js
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    addTag(input.value);
  }
});
\`\`\`

작은 디테일이지만 한국어 사용자가 매일 쓰는 입력 경험에서는 가장 중요한 품질 기준이 됩니다.`
    },

    // ==================== REVIEW POSTS ====================
    {
      id: 'review-shashak-daily-acorn',
      type: 'review',
      status: 'published',
      featured: false,
      category: '샤샥 후기',
      subLabel: '루틴 정착기 · 갓생 습관',
      bannerLine1: '작심삼일이던 아침 루틴,',
      bannerHighlight: '도토리 모으는 재미로',
      bannerLine2: '3주째 이어가고 있어요',
      iconType: 'shashak',
      themeColor: 'cream',
      title: '“체크할 때마다 도토리가 쌓이니 작은 할 일도 미루지 않게 돼요” — 샤샥 3주 사용 후기',
      summary: '핵심 요약 복잡한 플래너 대신 샤샥의 오늘·매일·주기 탭으로 생활 습관을 정리하고, 다람쥐 캐릭터와 도토리 보상 덕분에 아침·저녁 루틴을 꾸준히 유지한 후기입니다.',
      tags: ['샤샥후기', '루틴앱', '할일관리'],
      date: '2026.10.24',
      readMin: 5,
      views: 1340,
      content: `## 복잡한 노션 템플릿 대신 가볍게 체크하는 샤샥에 정착했어요

매달 초마다 거창한 계획표를 만들었다가 일주일 만에 포기하곤 했습니다. **샤샥(shashak)**은 앱을 켜자마자 로그인 없이 바로 할 일을 적을 수 있고, 오늘 해야 할 일과 매일·주기 루틴이 깔끔하게 나뉘어 있어서 머리가 복잡하지 않았습니다.

### 가장 좋았던 3가지 포인트

1. **도토리 보상 피드백**: 물 마시기나 비타민 챙겨 먹기 같은 사소한 습관도 완료할 때마다 도토리가 차곡차곡 쌓여서 기분 좋은 성취감을 줍니다.
2. **매일 / 주기 분리**: 매일 하는 일과 화·목·토 운동처럼 주기가 있는 일을 따로 관리하니 오늘 할 일 목록이 훨씬 정돈됩니다.
3. **따뜻한 다람쥐 감성**: 다그치는 알림 대신 가을 다람쥐와 함께 내 속도로 루틴을 채워가는 느낌이라 매일 저녁 자연스럽게 앱을 열게 됩니다.`
    },
    {
      id: 'review-toepick-commute-850',
      type: 'review',
      status: 'published',
      featured: true,
      category: 'ToePick 후기',
      subLabel: '실사용자 인터뷰 · 직장인 토익',
      bannerLine1: '출퇴근 지하철 20분,',
      bannerHighlight: '4주 만에 680→865점',
      bannerLine2: '달성한 직장인 루틴',
      iconType: 'toepick',
      themeColor: 'mint',
      title: '“무거운 문제집 대신 출퇴근길에 ToePick만 풀었어요” — 4주 만에 토익 865점 달성 후기',
      summary: '핵심 요약 퇴근 후 책상에 앉기 힘들었던 직장인이 아침·저녁 지하철에서 ToePick으로 Part 2·3·4 듣기와 Part 5 문법, 단어 복습 루틴을 완주한 실제 후기입니다.',
      tags: ['ToePick후기', '직장인토익', '토익850달성'],
      date: '2026.10.22',
      readMin: 6,
      views: 1680,
      content: `## 퇴근하고 집에 오면 문제집 펼칠 체력이 없었습니다

이직 준비로 2년 만에 토익 점수가 다시 필요해졌지만, 매일 야근 후 독서실에 가는 건 불가능에 가까웠습니다. 그러다 우연히 **ToePick**을 알게 되어 출퇴근 지하철 루틴을 만들었습니다.

### 내가 지킨 하루 20분 ToePick 루틴

1. **출근길 10분 (LC 집중)**: 이어폰을 끼고 Part 2와 Part 3·4 문제를 풀며 귀를 깨웠습니다.
2. **점심시간 5분 (RC Part 5)**: 헷갈리는 품사·어휘 문제를 풀고 바로 밑에 나오는 해설로 오답 이유를 체크했습니다.
3. **퇴근길 5분 (단어 복습)**: 낮에 틀렸던 문항의 단어만 다시 복습했습니다.

> "문제를 풀자마자 해설과 단어 복습으로 바로 넘어가는 흐름 덕분에 중간에 딴짓하지 않고 끝까지 풀 수 있었어요."

4주 뒤 치른 정기시험에서 목표였던 850점을 넘겨 **865점**을 받았습니다!`
    },
    {
      id: 'review-immyme-weekend-walk',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'IMMYME 후기',
      subLabel: '서비스 체험기 · 주말 산책',
      bannerLine1: '맨날 가던 프랜차이즈 대신',
      bannerHighlight: '골목길 숨은 아지트를',
      bannerLine2: '1분 만에 찾았어요',
      iconType: 'immyme',
      themeColor: 'purple',
      title: 'IMMYME 사용 후기: 약속 시간 1시간 남았을 때 기분 따라 동네 산책 코스 찾기',
      summary: '핵심 요약 앱을 따로 설치하지 않고 모바일 웹에서 바로 기분과 걷기 취향을 골라, 평소 지나치던 골목의 조용한 책방과 카페를 발견한 사용자의 이야기입니다.',
      tags: ['IMMYME후기', '동네산책', '장소추천'],
      date: '2026.10.20',
      readMin: 5,
      views: 1120,
      content: `## 지도 앱에서 '근처 카페'만 검색하던 습관이 바뀌었어요

주말 오후에 갑자기 시간이 비었을 때, 늘 가던 대형 프랜차이즈 카페에 가기는 아쉬웠습니다. 친구가 공유해준 **IMMYME** 링크를 열어봤는데 앱 설치 없이 브라우저에서 바로 시작되는 점이 정말 편했습니다.

### 기분과 걷기 취향만 골랐을 뿐인데

* **선택한 기분**: 조용히 생각 정리하고 싶은 날 ☺
* **걷기 취향**: 15분 내외로 천천히 걷기 좋은 길

추천받은 곳은 평소 자주 지나다니던 큰길 바로 뒤편의 작은 독립서점 겸 카페였습니다. 광고성 블로그 리뷰 없이도 내 기분에 딱 맞는 공간을 발견할 수 있어 주말마다 애용하고 있습니다.`
    },
    {
      id: 'review-toepick-part5-speed',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'ToePick 후기',
      subLabel: '대학생 학습 후기 · RC 단축',
      bannerLine1: '항상 시간 부족했던 RC,',
      bannerHighlight: 'Part 5 풀이 시간이',
      bannerLine2: '절반으로 줄었어요',
      iconType: 'star',
      themeColor: 'lime',
      title: '토익 Part 5에서 늘 시간을 뺏기던 대학생이 ToePick 해설로 풀이 속도를 높인 방법',
      summary: '핵심 요약 문장 전체를 처음부터 끝까지 다 해석하느라 Part 7 시간이 모자랐던 학습자가 ToePick의 핵심 포인트 해설을 통해 빈칸 전후 단서 파악법을 익힌 후기입니다.',
      tags: ['ToePick', '토익Part5', 'RC시간단축'],
      date: '2026.10.18',
      readMin: 5,
      views: 910,
      content: `## Part 5 한 문제에 1분씩 쓰던 습관을 고쳤습니다

예전에는 Part 5 문제를 풀 때 모든 단어를 다 해석하려고 했습니다. ToePick으로 매일 15문제씩 풀면서 **해설이 짚어주는 문법 포인트와 빈출 콜로케이션**을 바로 확인하니, 빈칸 앞뒤만 보고도 10초 만에 답을 고르는 눈이 생겼습니다.`
    },
    {
      id: 'review-immyme-travel-local',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'IMMYME 후기',
      subLabel: '국내 여행 · 동네 탐색',
      bannerLine1: '계획 없이 떠난 당일치기,',
      bannerHighlight: '현지인처럼 걷기 좋은',
      bannerLine2: '장소를 추천받다',
      iconType: 'map',
      themeColor: 'pink',
      title: '무계획 당일치기 여행에서 IMMYME로 관광지 대신 걷기 좋은 동네 스팟 찾기',
      summary: '핵심 요약 유명한 관광 명소 대신 그날의 날씨와 걸음걸이 기분에 맞춰 한적한 산책 코스와 휴식 공간을 찾아낸 여행자의 후기입니다.',
      tags: ['IMMYME', '당일치기', '산책코스'],
      date: '2026.10.16',
      readMin: 4,
      views: 780,
      content: `## 계획표 없이 내린 역에서 바로 켠 IMMYME

기차를 타고 내려서 아무 계획 없이 IMMYME를 켰습니다. 현재 위치 주변에서 '가볍게 걷기 좋은 곳'을 선택했더니 사람들로 붐비는 상업 거리 대신 고즈넉한 산책길과 전망 좋은 찻집을 추천해주어 최고의 오후를 보냈습니다.`
    },
    {
      id: 'review-toepick-vocab-memory',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'ToePick 후기',
      subLabel: '단어 암기 · 복습 루틴',
      bannerLine1: '외워도 까먹던 영단어,',
      bannerHighlight: '풀었던 문장 그대로',
      bannerLine2: '복습하니 안 잊혀요',
      iconType: 'toepick',
      themeColor: 'cream',
      title: '단어장만 따로 외울 때보다 기억이 3배 오래 가는 ToePick 문맥 기반 단어 복습 후기',
      summary: '핵심 요약 표제어와 뜻만 외우면 시험장에서 헷갈렸던 단어들을, 내가 직접 풀었던 LC·RC 문제의 문맥과 함께 복습하며 암기 효율을 높인 후기입니다.',
      tags: ['토익단어', 'ToePick후기', '어휘복습'],
      date: '2026.10.14',
      readMin: 6,
      views: 830,
      content: `## 단어만 외우면 왜 시험장에서 기억이 안 날까?

단어장 책으로 외울 때는 분명 알던 단어인데 시험지 문장 속에 들어가면 뜻이 떠오르지 않았습니다. ToePick은 **방금 내가 풀었던 문제에 나온 단어를 바로 복습**하게 해주어서 문장 전체의 맥락과 함께 자연스럽게 기억에 남습니다.`
    },
    {
      id: 'review-immyme-couple-date',
      type: 'review',
      status: 'published',
      featured: false,
      category: 'IMMYME 후기',
      subLabel: '일상 발견 · 취향 매칭',
      bannerLine1: '“오늘 뭐 할까?” 고민 끝,',
      bannerHighlight: '서로의 오늘 기분으로',
      bannerLine2: '새로운 동네 발견하기',
      iconType: 'immyme',
      themeColor: 'purple',
      title: '매주 만나는 동네에서 새로운 산책 코스를 찾고 싶을 때 IMMYME를 쓰는 법',
      summary: '핵심 요약 늘 비슷한 코스로만 걷던 일상에서 벗어나, 직접 지역을 선택하고 기분 키워드를 바꿔가며 색다른 장소를 발견한 사용자 후기입니다.',
      tags: ['IMMYME', '주변가볼만한곳', '취향발견'],
      date: '2026.10.10',
      readMin: 5,
      views: 740,
      content: `## 익숙한 동네도 기분 키워드를 바꾸면 다르게 보입니다

현재 위치뿐만 아니라 가고 싶은 지역을 직접 선택할 수 있어서, 만나기 전에 미리 그날 기분에 맞는 장소를 둘러보는 재미가 쏠쏠합니다.`
    }
  ];

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

  function loadAllPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
        return DEFAULT_POSTS.slice();
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read posts from localStorage:', e);
    }
    return DEFAULT_POSTS.slice();
  }

  function saveAllPosts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage:', e);
    }
  }

  function resetToDefaults() {
    saveAllPosts(DEFAULT_POSTS);
    return DEFAULT_POSTS.slice();
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
    return Math.max(3, Math.min(35, Math.round(chars / 140) || 5));
  }

  function formatTodayDot() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }

  function autoBannerFromTitle(title, category) {
    const clean = String(title || '제목을 입력하세요').trim();
    const parts = clean.split(/[:：\-—]/);
    if (parts.length >= 2) {
      const left = parts[0].trim();
      const right = parts.slice(1).join(' ').trim();
      const words = right.split(/\s+/);
      const mid = Math.ceil(words.length / 2);
      return {
        bannerLine1: left.slice(0, 18),
        bannerHighlight: words.slice(0, mid).join(' ').slice(0, 16) || clean.slice(0, 14),
        bannerLine2: words.slice(mid).join(' ').slice(0, 18) || category || 'Minlabs'
      };
    }
    const words = clean.split(/\s+/);
    if (words.length >= 3) {
      const third = Math.ceil(words.length / 3);
      return {
        bannerLine1: words.slice(0, third).join(' ').slice(0, 18),
        bannerHighlight: words.slice(third, third * 2).join(' ').slice(0, 18),
        bannerLine2: words.slice(third * 2).join(' ').slice(0, 18)
      };
    }
    return {
      bannerLine1: category || 'Minlabs Note',
      bannerHighlight: clean.slice(0, 15),
      bannerLine2: clean.slice(15, 30) || '새로운 이야기'
    };
  }

  function normalizeTheme(theme) {
    const map = {
      blue: 'mint',
      teal: 'mint',
      indigo: 'purple',
      slate: 'cream'
    };
    const t = map[theme] || theme || 'mint';
    return ['mint', 'purple', 'lime', 'pink', 'cream'].includes(t) ? t : 'mint';
  }

  function getIconBoxHTML(post) {
    const catLower = (post.category || '').toLowerCase();
    const key = post.iconType || (catLower.includes('immy') ? 'immyme' : catLower.includes('toe') ? 'toepick' : (catLower.includes('shashak') || catLower.includes('샤샥')) ? 'shashak' : post.type === 'review' ? 'star' : 'ai');
    const item = ICON_SVGS[key] || ICON_SVGS.ai;
    const customLabel = escapeHtml(post.iconLabel || item.label || post.category || 'Minlabs');
    if (item.img) {
      return `<div class="thumb-icon-wrap"><div class="thumb-icon-box"><img src="${escapeHtml(item.img)}" alt=""></div><span class="thumb-icon-caption">${customLabel}</span></div>`;
    }
    return `<div class="thumb-icon-wrap"><div class="thumb-icon-box">${item.svg}</div><span class="thumb-icon-caption">${customLabel}</span></div>`;
  }

  function renderThumbnailHTML(post, isHero) {
    const auto = autoBannerFromTitle(post.title, post.category);
    const line1 = escapeHtml(post.bannerLine1 || auto.bannerLine1);
    const hl = escapeHtml(post.bannerHighlight || auto.bannerHighlight);
    const line2 = escapeHtml(post.bannerLine2 || auto.bannerLine2);
    const subLabel = escapeHtml(post.subLabel || (post.type === 'review' ? '사용자 스토리 · 실사용 후기' : 'Minlabs 아티클'));
    const catPill = escapeHtml(post.category || (post.type === 'review' ? '후기' : '블로그'));
    const theme = normalizeTheme(post.themeColor);

    const bgStyle = post.thumbnailImage
      ? `style="background-image: linear-gradient(90deg, rgba(25,24,30,0.82) 0%, rgba(25,24,30,0.45) 100%), url('${escapeHtml(post.thumbnailImage)}'); background-size: cover; background-position: center; color: #fff;"`
      : '';

    return `
      <div class="av-thumb av-theme-${theme} ${isHero ? 'av-thumb-hero' : ''}" ${bgStyle}>
        <div class="av-thumb-orbit" aria-hidden="true"></div>
        <span class="av-thumb-spark" aria-hidden="true">✳</span>
        <div class="av-thumb-top">
          ${isHero
            ? `<span class="av-sub-kicker">${subLabel}</span>`
            : `<span class="av-cat-pill">${catPill}</span>`
          }
          <span class="av-brand-mark">minlabs<span class="av-brand-dot">.</span></span>
        </div>
        <div class="av-thumb-main">
          <div class="av-thumb-copy">
            ${!isHero ? `<span class="av-sub-kicker">${subLabel}</span>` : ''}
            <div class="av-thumb-headline">
              <span>${line1}</span>
              <span class="av-hl"><span>${hl}</span></span>
              ${line2 ? `<span>${line2}</span>` : ''}
            </div>
          </div>
          ${getIconBoxHTML(post)}
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
    if (opts.sort === 'popular') {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    }
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
      ? `핵심 요약 ${plain.slice(0, 115)}${plain.length > 115 ? '...' : ''}`
      : '핵심 요약 Minlabs에 등록된 새로운 글입니다.';
    const summaryText = input.summary && input.summary.trim()
      ? (input.summary.trim().startsWith('핵심 요약') ? input.summary.trim() : `핵심 요약 ${input.summary.trim()}`)
      : defaultSummary;

    const autoBanner = autoBannerFromTitle(input.title, input.category);

    const postObj = {
      id: input.id || `${input.type || 'blog'}-${Date.now()}`,
      type: input.type === 'review' ? 'review' : 'blog',
      status: input.status === 'draft' ? 'draft' : 'published',
      featured: Boolean(input.featured),
      category: (input.category || (input.type === 'review' ? '후기' : 'Minlabs')).trim(),
      subLabel: (input.subLabel || (input.type === 'review' ? '실사용 후기 · 스토리' : 'Minlabs Journal')).trim(),
      bannerLine1: (input.bannerLine1 || autoBanner.bannerLine1).trim(),
      bannerHighlight: (input.bannerHighlight || autoBanner.bannerHighlight).trim(),
      bannerLine2: (input.bannerLine2 !== undefined ? input.bannerLine2 : autoBanner.bannerLine2).trim(),
      iconType: input.iconType || (input.type === 'review' ? 'star' : 'ai'),
      iconLabel: (input.iconLabel || '').trim(),
      themeColor: normalizeTheme(input.themeColor),
      thumbnailImage: input.thumbnailImage || '',
      title: (input.title || '제목 없는 글').trim(),
      summary: summaryText,
      tags: Array.isArray(input.tags) && input.tags.length ? input.tags : [(input.category || 'Minlabs').replace(/\s+/g, '')],
      date: nowDate,
      readMin: input.readMin || calcReadMinutes(input.content || ''),
      views: typeof input.views === 'number' ? input.views : 120,
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
    renderThumbnailHTML,
    renderMarkdown,
    escapeHtml,
    calcReadMinutes,
    autoBannerFromTitle,
    isAdminAuthenticated,
    AUTH_SESSION_KEY
  };
})(window);
