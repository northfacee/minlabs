# Minlabs

공개 도메인 `https://minlabs.app/`을 위한 두 프로젝트 소개 페이지. 빌드 도구나 실행 JavaScript 없이 HTML·CSS·로컬 앱 아이콘과 JSON-LD 메타데이터만 사용한다.

- ToePick: 토익 LC·RC, 해설·단어 복습. `https://toepick.minlabs.app/` 연결.
- Immyme: 기분·취향에 맞는 장소 추천. `https://immyme.com/` 연결.
- 데스크톱 2열, 모바일 1열 카드. 키보드 포커스·본문 이동·모션 줄이기 지원.
- 외부 폰트·스크립트·분석 SDK·API 호출 없음. 각 프로젝트의 원본 앱을 변경하지 않는다.
- 연락처 `support@minlabs.app`.

로컬 확인: `python3 -m http.server 4180 --directory dist --bind 127.0.0.1`.

배포 설정은 `.openai/hosting.json`을 사용하며 Sites의 소스 동기화·정적 패키징으로 게시한다. 도메인의 기존 메일·ToePick 서브도메인 DNS는 유지하고 apex 웹 연결만 추가한다.

검증(2026-10-20): Chromium 360·768·1440px에서 카드 2개·프로젝트 링크·아이콘 로딩·가로 넘침 없음과 JavaScript 오류/HTTP 실패 없음을 확인했다. 본문 이동 링크의 첫 키보드 포커스를 확인했고 데스크톱·모바일 스크린샷을 시각 검토했다. 소개 페이지는 JavaScript를 사용하지 않는다.

## 비비드 컬러 개편 (2026-10-20)

밝은 중립 배경과 흰 설명 영역은 유지하고 민트·일렉트릭 보라 카드, 핫핑크·라임 스티커, 보라 제목·라임 밑줄을 적용했다. 로고·파비콘과 링크 화살표에도 같은 팔레트를 사용한다. 검정 얇은 테두리·짧은 그림자와 hover 반응으로 강조하며, 모션 줄이기에서는 움직임을 끈다. 360·768·1440px에서 카드 2개·링크·이미지·가로 넘침·실행 및 요청 오류·키보드 본문 이동과 모션 줄이기를 확인하고 데스크톱·모바일 스크린샷을 검토했다.

## 세로 여백 축소 (2026-10-20)

헤더 높이, 소개 영역 상하 패딩, 제목·설명 사이, 프로젝트 제목 행, 카드 내부 설명·하단, 푸터 간격을 축소했다. 모바일 카드 사이 간격도 28→20px로 줄였다. 기존 비비드 팔레트·글자 크기·일러스트와 링크를 유지한다.

검증: Chromium 360·768·1440px에서 가로 넘침 없음, 두 카드·이미지 로딩을 확인하고 모바일·데스크톱 스크린샷을 검토했다. 1440px 전체 높이는 1347→1147px, 360px는 1625→1445px로 줄었다.

## 민 모노그램·헤더 정리 (2026-10-20)

상단 프로젝트 메뉴와 라임 화살표 박스를 제거했다. 소개 제목과 설명의 강제 줄바꿈을 제거해 태블릿·데스크톱에서는 한 줄로 배치하고 작은 모바일에서는 자연스럽게 줄바꿈한다. 사용자 스케치의 ㅁ과 긴 ㅣ·ㄴ 결합을 7.5 단위 획의 SVG 모노그램으로 옮겨 헤더와 파비콘에 적용했다. ㄴ은 ㅁ보다 세로·밑변이 길며 워드마크와 같은 검정색을 사용한다.

검증: Chromium 360·768·1024·1440px의 가로 넘침 없음·아이콘과 이미지 로딩·메뉴/박스 제거를 확인했다. 768px 이상 제목 1줄을 확인하고 데스크톱·모바일·워드마크 스크린샷을 시각 검토했다.

## 로고 두께·문구 정리 (2026-10-20)

모노그램 획을 7.5→15로 두 배 늘리고 두 글자가 붙거나 가장자리가 잘리지 않도록 간격·캔버스를 보정했다. 헤더와 파비콘에 함께 적용했다. 메인 제목 아래 소개 문장, 프로젝트 제목 오른쪽 설명, 푸터 슬로건을 제거하고 빈 컨테이너와 관련 스타일도 정리했다.

검증: Chromium 360·1440px에서 삭제 문구와 빈 소개 컨테이너 없음, 로고 로딩, 카드 두 개, 가로 넘침 없음을 확인하고 로고·모바일 스크린샷을 시각 검토했다.

## 검색 접근성과 소개 보강 (2026-10-21)

- 사이트 제목·설명에 Minlabs와 ToePick·IMMYME의 역할을 명시했다. 기존 메인 슬로건·프로젝트 카드 디자인은 유지한다.
- 서비스 소개, 이용 경로, 설치 여부·문의처 FAQ를 HTML 본문에 추가하고 IMMYME 표기를 통일했다.
- 화면 내용과 일치하는 Organization·WebSite·SoftwareApplication JSON-LD를 추가했다.
- `dist/robots.txt`와 `dist/sitemap.xml`을 제공한다. 사이트맵은 이 도메인의 홈만 포함한다.
- 정적 `404.html`과 `static.not_found_handling: 404-page`로 없는 주소가 홈의 HTTP 200이 되지 않게 한다.

검증: 360·1440px에서 가로 넘침과 이미지 로딩 실패 없음, FAQ 열기 동작을 확인했다. 사이트맵 XML·JSON-LD 파싱과 robots·정적 404 산출물을 확인했다.

## 중복 소개 제거와 정체성 문구 수정 (2026-10-21)

상단 제품 카드와 겹치는 ABOUT MINLABS 영역·추가 제품 카드 두 개를 제거했다. “Minlabs는 어떤 곳인가요?” 답변을 사용자가 지정한 “궁금하거나 흥미있는 아이디어가 떠오르면 바로 실행해보는 개인 프로젝트 실험실입니다.”로 교체했다. 제목·메타 설명·구조화 데이터도 개인 프로젝트 실험실이라는 설명에 맞췄다. 기존 프로젝트 카드와 나머지 FAQ·검색 접근성 설정은 유지한다.

## SEO 및 GEO(생성형 AI 검색) 최적화 (2026-10-23)

- **GEO(Generative Engine Optimization)**: `dist/llms.txt` 및 `dist/llms-full.txt`를 추가하고 `<link rel="alternate" type="text/plain">`으로 연결했다. `dist/robots.txt`에 주요 검색엔진(`Googlebot`, `Yeti`, `Bingbot`) 및 생성형 AI 크롤러(`OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`) 수집 허용을 명시했다.
- **구조화 데이터(JSON-LD) 고도화**: `Organization`(로고·연락처·대체명·관련 도메인), `WebSite`, `CollectionPage`, `ItemList`, `SoftwareApplication`·`MobileApplication`(ToePick), `WebApplication`(IMMYME), `FAQPage`를 `@graph`로 연결하고 FAQ에 ToePick 안내 문항을 보강했다.
- **소셜·검색 메타 및 아이콘**: 브랜드 디자인을 반영한 1200×630 오픈그래프 이미지(`dist/assets/og-image.png`), 애플 터치 아이콘(`dist/assets/apple-touch-icon.png`), 웹 앱 매니페스트(`dist/site.webmanifest`), Twitter Card·Open Graph·`robots` 메타 태그, `sitemap.xml`의 `lastmod`를 추가했다.
- **성능(Core Web Vitals) 및 마크업 최적화**: 앱 아이콘 WebP(`toepick.webp` 12KB, `immyme.webp` 9KB)와 `<picture>` 폴백, 주요 이미지 `fetchpriority="high"`, FAQ `<details name="faq">` 아코디언 그룹화 및 `vercel.json` 캐시·콘텐츠 헤더를 적용했다.

## 블로그·후기 페이지 및 어드민 에디터 추가 (2026-10-23)

- **상단 메뉴 개편**: 홈(`dist/index.html`) 및 전 페이지 우측 상단 내비게이션을 `블로그`, `후기`, `문의하기`로 구성했다.
- **블로그(`dist/blog.html`) & 후기(`dist/reviews.html`)**: 다크 에디토리얼 레이아웃으로 상단 검색(`⌘K`), 카테고리·태그 필터, `최신순/인기순` 정렬, 상단 `EDITOR'S PICK` 히어로 카드, 3열 아티클 그리드 및 상세 보기(`dist/post.html`)를 지원한다.
- **어드민 목록 및 Velog 스타일 글쓰기 에디터(`dist/admin.html`)**:
  - 글 목록 관리 화면에서 전체·블로그·후기·임시저장 필터링, 대표글(`EDITOR'S PICK`) 지정, 블로그↔후기 게시판 전환, 수정·삭제·JSON 백업을 지원한다.
  - 글쓰기 화면은 다크 에디터(`제목을 입력하세요`, 구분선, 한글 IME 안전 태그 입력, `H1~H4 · B · I · S · 인용구 · 링크 · 이미지 · 코드블록` 툴바, 실시간 카드·본문 미리보기, 하단 `← 나가기`, `임시저장`, `출간하기`)를 제공하며 출간 즉시 선택한 블로그 또는 후기 목록에 반영된다.
