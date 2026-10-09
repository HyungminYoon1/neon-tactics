# Verification record

## 2026-10-09 — current improvements and optional public records

- LOCAL: 44 Node tests and source checks PASS. Practice saves/independent records and versioned final replay are separate from the public API.
- LOCAL_BROWSER: fixed mission 16 completed with actual legal unit selection, keyboard targeting and command confirmation; score 4280. Explicit public challenge/registration/query/delete against local workerd SQLite PASS. At 320px the completion panel could block registration; result-close now hides only the panel and the completed replay remains registrable. Actual mobile registration and deletion checked. No fabricated score or injected game state.
- LIVE_API: real Worker SQLite accepted legal 4280; query/retry/delete and invalid fields/unfinished commands/CORS rejection PASS. QA identity and scores removed. The API's current deployment evidence is in web-lab-ranking/docs/verification.md.
- PREVIEW: new actual 1440×1000 play frame copied into WEB LAB. Source and static Pages publication are checked separately by the main integration record.
- NOT_RUN: independent human difficulty/fun calibration, physical phones and human-only/unique-person verification. See [main integration record](https://github.com/HyungminYoon1/web-lab/blob/main/docs/verification.md) for current remote CI/Pages evidence; earlier snapshots below remain historical.

## 2026-10-09 — v2 local implementation handoff (not deployed)

- LOCAL_TEST: 44/44 PASS. The 12 original executable witnesses retain all expected reports/scores. Four appended objective witnesses use actual legal move/skill/end commands. Negative coverage includes stalled/destroyed/blocked convoy, incomplete escape/unit loss, interrupted hold/deadline, master city/all-alive/skill/hold constraints, full next-turn preview, replay undo/hint/restore, malformed/version/byte/action bounds, durable-only gallery summary, clear isolation, storage denial, ranked budget/terminal/unknown actions and recomputed score.
- Rule fixtures that directly arrange damaged actors are synthetic unit tests; objective witnesses and replay fixtures start from authored initial states. No fixture is loaded by the public UI.
- STATIC_CHECK: PASS, 12 public files; JavaScript syntax, local module/assets, explicit storage boundary, pure model/replay/ranked boundary, CSP, unique DOM IDs/control references, credential-pattern scan with suppressed values, UTF-8 without BOM and CRLF. git diff --check: PASS. The existing persistence prohibition was narrowed only for the documented approved storage boundary; network/cookie/eval prohibitions remain.
- BROWSER_LOCAL / SCREENSHOTS / PHYSICAL_MOBILE: NOT_RUN for this revision; main owns actual desktop/390/320 interaction and captures. Historical evidence below applies to the prior v1 revision only.
- REMOTE_CI / LIVE / RANKING_API / WORKER_RUNTIME: NOT_RUN. No commit, push, provisioning, account access, SDK or endpoint added.
- Source inventory: VERIFIED architecture.md, requirements.md, README.md, docs/decisions.md, .gitattributes, dist source/UI/styles, current model/tests and witnesses, local check. api-spec.md is absent. PARTIAL repository auxiliary tooling/workflow: inventoried, with relevant witness/check tooling inspected; serve/deploy infrastructure unchanged. Sibling repositories were not opened or modified; directory names alone were inventoried to identify the 15-app aggregate allowlist.

### Main integration contract

- dist/src/ranked.js exports RULES_VERSION=neon-2.0.0, CHALLENGE_ID=neon-master-16-v2, rankingDefinition(), replayRanked(actions).
- Fixed level 16; maximum 20 commands. External end-turn spelling is endTurn. Internal practice replay uses end. Move/skill require exactly type/unitId/x/y. Unknown/extra fields, invalid ranges/budgets, commands after a terminal state and overlong logs throw. Empty/unfinished/failed legal attempts return won=false, score=0. No client state/score is accepted.
- Result: won/score/tieBreak/summary, with ascending tie-break turns, commands, city HP loss, unit HP loss. The fixture returns score 4280, tieBreak [5,12,0,6], held 4, skills 10, power 12. All three units live.
- app.js exports rankingAdapter.start/getActions/isComplete/getDefinition. #start-ranked is the ordinary DOM start button and #board[data-mode=ranked] identifies the mode. No network is sent. The adapter returns copied actual accepted commands only. Fresh retry clears capture; undo/hints are disabled and rejected. Practice saves/bests remain separate; ranked capture is not autosaved.
- Warm local Windows Node v22.23.2 benchmark, 100 full witness replays after 10 warmups: median 1.21 ms, p95 2.84 ms, max 7.14 ms; action JSON 579 bytes. This is not Worker CPU evidence or a 10 ms guarantee. Main must benchmark the target runtime.

### Actual UI capture instructions

1. Run npm run dev -- 0 and use its returned loopback URL. First visit opens a compact choice. Choose 조작 입문 to play mission 1 with assistance, or 최상위 임무 바로 시작 for independent mission 16 practice. Existing saved runs expose 이어서 하기; no command auto-executes on load.
2. Tutorial from fresh state, using ordinary keyboard with board focused: 1, E, ArrowUp, Enter; 2, E, ArrowUp three times, Enter; 3, E, ArrowUp twice, Enter. Expect real victory 5900, 도움 사용, no independent gallery completion. Start mission 1 through 임무 (not 조작 입문) and repeat for an independent best and aggregate completed=1.
3. Meaningful master action preview: choose mission 16, press 3, E, ArrowLeft twice; before Enter, capture the S→E3 exchange preview at 4열 2행. Enter executes it. Then press 3, E, ArrowRight once and ArrowDown three times; preview targets E1 at 5열 5행. Capture or confirm. These are the first two legal commands in the full highest witness.
4. Complete mission 16 through tools/objective-witnesses.mjs id=16 (same actual path as the original id=12 witness). Coordinates in fixture are zero-based; UI shows x+1/y+1. Select the indicated unit, Q/E, move cursor with arrows, then Enter. For type=end use T only after confirming/cancelling a target. Expected victory 4280, turn 5, city 12, skills 10, held 4. Do not inject state, score or stored wins.
5. Mission 13: select through 임무. Capture the yellow V route and convoy before following its witness. Mission 14 shows EXIT tiles and removes each evacuated unit; mission 15 shows two HOLD tiles and the count after each actual enemy turn. objective-witnesses.mjs contains legal paths for all four additions; model tests cover their failure paths.
6. At 390px and 320px, use 맞춤 to see the full board, + twice for 200%, then drag/scroll or the four 전장 direction buttons. The target pad moves the selected grid cursor; it is distinct from panning. Verify selecting units, Q/E equivalent controls, exact preview, confirmation/cancel and end turn; verify sticky action strip does not block other controls or produce document overflow.
7. Practice recovery: make a legal command, note turn/AP/positions, reload, choose 이어서 하기. Check identical state and usable undo. Delete through 기록 삭제→삭제; reload must show no resume/own achievement, leaving other app summary entries and unrelated keys intact. Test storage-disabled and quota failure independently; visible memory-only status should remain playable. Two tabs changing this game's save require explicit resume/new choice in the other tab.
8. Ranked: 임무→최상위 기록 도전. Check fixed 16, disabled hint/undo, real action capture, restart resets capture and independent practice save survives. No public rank or submission is rendered. Capture actual canvas/controls; the source/static checks above are not screenshot evidence.

### Modified paths

architecture.md, requirements.md, README.md, docs/decisions.md, docs/verification.md; dist/index.html, dist/styles.css; dist/src/app.js, levels.js, model.js, render.js, replay.js, storage.js, progress.js, ranking.js, ranked.js; test/model.test.js, objectives.test.js, replay-storage.test.js, ranked.test.js; tools/check.mjs, objective-witnesses.mjs.

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
