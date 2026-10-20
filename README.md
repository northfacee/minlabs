# Minlabs

공개 도메인 `https://minlabs.app/`을 위한 두 프로젝트 소개 페이지. 빌드 도구나 JavaScript 없이 HTML·CSS·로컬 앱 아이콘만 사용한다.

- ToePick: 토익 LC·RC, 해설·단어 복습. `https://toepick.minlabs.app/` 연결.
- Immyme: 기분·취향에 맞는 장소 추천. `https://immyme.com/` 연결.
- 데스크톱 2열, 모바일 1열 카드. 키보드 포커스·본문 이동·모션 줄이기 지원.
- 외부 폰트·스크립트·분석 SDK·API 호출 없음. 각 프로젝트의 원본 앱을 변경하지 않는다.
- 연락처 `support@minlabs.app`.

로컬 확인: `python3 -m http.server 4180 --directory dist --bind 127.0.0.1`.

배포 설정은 `.openai/hosting.json`을 사용하며 Sites의 소스 동기화·정적 패키징으로 게시한다. 도메인의 기존 메일·ToePick 서브도메인 DNS는 유지하고 apex 웹 연결만 추가한다.

검증(2026-10-20): Chromium 360·768·1440px에서 카드 2개·프로젝트 링크·아이콘 로딩·가로 넘침 없음과 JavaScript 오류/HTTP 실패 없음을 확인했다. 본문 이동 링크의 첫 키보드 포커스를 확인했고 데스크톱·모바일 스크린샷을 시각 검토했다. 소개 페이지는 JavaScript를 사용하지 않는다.
