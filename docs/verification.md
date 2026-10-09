# Verification record

## 2026-10-09 — LOCAL implementation acceptance (pre-publication snapshot)

- LOCAL_TEST: PASS. 23 model tests: 모든 임무의 실제 명령·시설·전멸 해답, 미리보기/실행 일치 및 예고/실제 공격 순서, 독립 충돌/수중/교환/행동 예산/폭발·죽은 사수 취소/실패/재현 사례.
- BROWSER_LOCAL: PASS for selected flows. 1/7/12의 일반 기체·기술 선택, Canvas 목표 지정과 명령 확인으로 실제 성공했습니다. 5900/5160/4280점 일치를 확인했습니다. 키보드 기술, 명령/AP 취소, 실제 적 턴 취소, 전력 리셋과 미확정 목표 상태의 적 턴 차단을 확인했습니다.
- Viewports: desktop 1440×1000; 390×900 and 320×900 responsive controls/menus/no document overflow. Scroll is internal to the board; no tiny-board substitute.
- Main gameplay used ordinary UI/keyboard/palette/Canvas actions, not injected game state, a mocked win or a changed model clock. Model witnesses are offline tools, not imported by the public game.
- Public file checker: PASS. 7 public files; syntax/import/assets/privacy/pure-rule/CSP/UTF8-without-BOM/CRLF gate. Local screenshots are not proof of current public deployment.
- REMOTE_CI: NOT_RUN at this pre-publication snapshot.
- LIVE: NOT_RUN at this pre-publication snapshot.
- Subsequent remote CI, commit and actual public file verification: [WEB LAB latest deployment record](https://github.com/HyungminYoon1/web-lab/blob/main/docs/verification.md).

## Inspection scope

Follow-up local QA: 320px에서 실제 1번 캠페인 성공과 결과 카드 전체의 화면 내 표시를 확인했습니다. 금고/물류의 이 headless 환경은 탭 전환에도 document.hidden=false였으므로 실제 visibility 전환은 NOT_OBSERVED이며, 합성 blur event에 의한 핸들러 중단·포커스 복귀 후 자동 재개 없음만 따로 확인했습니다.

VERIFIED: this repository's architecture/requirements/README/decisions, all implemented rules/campaign/UI/rendering, test cases, witness tooling, dist assets, local preview/check tools and Pages workflow.
PARTIAL: actual browser walkthroughs selected 1/7/12; the remaining campaign levels were validated by executable model witnesses, not all individually completed in the browser.
NOT_RUN: physical mobile device, every browser/platform, independent human difficulty/fun calibration and global ranking/backend (not implemented).

## Bounds and distinct evidence

8×8, 기체 3/시설 3/적 최대 7, 처리 엔티티 상한 16. 최대 6턴, 턴당 3명령/기체당 2행동, 취소 32 상태. 연쇄 밀기/폭발 상한 16. 효과 애니메이션만 430ms이며 게임 상태는 실제 명령 시에만 바뀝니다.

Model preview equivalence tests share the actual command function; independent boundary fixtures separately assert collision, ordering, timing, occupancy or failure expectations. Synthetic rule fixtures are not labelled browser gameplay or public results. No secret or environment values are printed.
