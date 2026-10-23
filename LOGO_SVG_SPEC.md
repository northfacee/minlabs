# Minlabs 로고 심볼 (ㅁㄴ) SVG 설정 및 규격 가이드

확정된 Minlabs 브랜드 심볼(`ㅁ` 다이나믹 오렌지 + `ㄴ` 퓨어블랙 + 우상단 일렉트릭 퍼플 도트)의 기하학 파라미터, 컬러 코드, 용도별 SVG 원본 코드를 정리한 문서입니다.

---

## 1. 컬러 팔레트 설정값

| 요소 | 컬러 이름 | HEX 코드 | RGB | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **`ㅁ` (초성 미음)** | **다이나믹 오렌지 (Dynamic Orange)** | `#ff5100` | `rgb(255, 81, 0)` | 좌측 사각 프레임 (`stroke`) |
| **`ㄴ` (니은 / L)** | **퓨어블랙 (Pure Black)** | `#09090b` | `rgb(9, 9, 11)` | 중앙·우측 L 프레임 (`stroke`, 다크 배경에서는 `#faf9f6`) |
| **우상단 점 (Dot)** | **일렉트릭 퍼플 (Electric Purple)** | `#4e14f5` | `rgb(78, 20, 245)` | 우상단 포인트 원 (`fill`) |
| **배경 (Background)** | **웜 오프화이트 (Warm Off-White)** | `#faf9f6` | `rgb(250, 249, 246)` | 파비콘·터치 아이콘·웹 기본 배경 |

---

## 2. 기하학 파라미터 & 슬라이더 설정값

| 항목 | 설정값 | SVG 속성 / 계산식 |
| :--- | :--- | :--- |
| **전체 캔버스 (`viewBox`)** | `0 0 101 63` | 가로 `101`, 세로 `63` (여백 포함) |
| **실제 시각적 영역 (Visual Bounds)** | 가로 `92px` × 세로 `54px` | `x: 3 ~ 95`, `y: 3 ~ 57` |
| **선 두께 (`stroke-width`)** | `12px` | `stroke-linejoin="round"`, `stroke-linecap="square"` |
| **모서리 둥글기 (`rx` / 곡률)** | `4px` | `ㅁ`의 `rx="4"`, `ㄴ` 꺾임부 `Q59 51 65 51` (곡률 반경 `6px`) |
| **`ㅁ` 중심선 크기** | `28px × 28px` (세로 비율 `+0px`) | `<rect x="9" y="9" width="28" height="28" rx="4"/>` (외곽 기준 `40×40`, 내부 공백 `16×16`) |
| **`ㅁ`과 `ㄴ` 사이 간격** | `10px` | `ㅁ` 우측 외곽(`x=43`) ~ `ㄴ` 좌측 외곽(`x=53`) |
| **`ㄴ` 가로 길이** | `30px` | 중심선 기준 `x: 59 → 89` (외곽 기준 `x: 53 → 95`, 총 `42px`) |
| **`ㄴ` 하단 단차 (길이)** | `14px` | `ㅁ` 하단 중심선(`y=37`)보다 `14px` 아래인 `y=51`까지 내려감 |
| **`ㄴ` 패스 (`d`)** | `M59 9V45Q59 51 65 51H89` | 상단 `y=9`(`ㅁ`과 동일 선상 정렬) → 하단 `y=51` → 우측 `x=89` |
| **우상단 점 (Dot)** | 반지름 `r="6"` (`12px` 직경) | `<circle cx="89" cy="11" r="6" fill="#4e14f5"/>` |

---

## 3. 용도별 SVG 코드 원본

### ① 기본 심볼 (`dist/assets/minlabs-symbol.svg`)
웹 헤더(`<img class="brand-symbol" width="67" height="42">`) 및 일반 라이트 배경용 심볼입니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 63">
  <title>Minlabs</title>
  <g fill="none" stroke-width="12" stroke-linejoin="round" stroke-linecap="square">
    <rect x="9" y="9" width="28" height="28" rx="4" stroke="#ff5100"/>
    <path d="M59 9V45Q59 51 65 51H89" stroke="#09090b"/>
  </g>
  <circle cx="89" cy="11" r="6" fill="#4e14f5"/>
</svg>
```

### ② 다크 배경용 심볼 (Dark Mode Variant)
어두운 배경(`#09090b` 또는 `#19181e`) 위에서 사용할 때 `ㄴ` 색상만 `#faf9f6`으로 반전한 버전입니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 63">
  <title>Minlabs</title>
  <g fill="none" stroke-width="12" stroke-linejoin="round" stroke-linecap="square">
    <rect x="9" y="9" width="28" height="28" rx="4" stroke="#ff5100"/>
    <path d="M59 9V45Q59 51 65 51H89" stroke="#faf9f6"/>
  </g>
  <circle cx="89" cy="11" r="6" fill="#4e14f5"/>
</svg>
```

### ③ 파비콘 (`dist/assets/favicon.svg`)
`96×96` 라운드 스퀘어(`rx="18"`, 배경 `#faf9f6`) 중앙에 심볼을 배치한 버전입니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <rect width="96" height="96" rx="18" fill="#faf9f6"/>
  <g transform="translate(7 23) scale(.84)">
    <g fill="none" stroke-width="12" stroke-linejoin="round" stroke-linecap="square">
      <rect x="9" y="9" width="28" height="28" rx="4" stroke="#ff5100"/>
      <path d="M59 9V45Q59 51 65 51H89" stroke="#09090b"/>
    </g>
    <circle cx="89" cy="11" r="6" fill="#4e14f5"/>
  </g>
</svg>
```

### ④ 애플 터치 아이콘 생성용 SVG (`180×180` — `dist/assets/apple-touch-icon.png` 원본)
iOS 홈 화면 아이콘 규격(`180×180`, 직각 배경 `#faf9f6`)에 맞춘 SVG 원본입니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#faf9f6"/>
  <g transform="translate(11 42) scale(1.56)">
    <g fill="none" stroke-width="12" stroke-linejoin="round" stroke-linecap="square">
      <rect x="9" y="9" width="28" height="28" rx="4" stroke="#ff5100"/>
      <path d="M59 9V45Q59 51 65 51H89" stroke="#09090b"/>
    </g>
    <circle cx="89" cy="11" r="6" fill="#4e14f5"/>
  </g>
</svg>
```

---

## 4. 프로젝트 내 반영 파일 목록

- `dist/assets/minlabs-symbol.svg`: 메인 헤더 심볼 (`101×63`)
- `dist/assets/favicon.svg`: 브라우저 탭 파비콘 (`96×96`)
- `dist/assets/apple-touch-icon.png`: iOS/모바일 홈 화면 아이콘 (`180×180`)
- `dist/assets/og-image.png`: 소셜 공유용 오픈그래프 이미지 좌상단 로고 (`1200×630`)
- `dist/index.html`, `dist/blog.html`, `dist/post.html`, `dist/reviews.html`, `dist/admin.html`, `dist/404.html`, `dist/site.webmanifest`: 심볼·파비콘 참조 및 캐시 버전(`?v=10`) 업데이트 완료
