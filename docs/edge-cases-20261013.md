# neon-tactics — systematic edge-case audit / 2026-10-13

새 LOCAL 감사이며 이전 유지보수/CI/공개 이력과 분리한다. 기준 HEAD `fea07643c54c3153478eb1de48dc3596019e412a`, 최초 clean main 확인. Named echo-vault/neon-tactics/parcel-panic/light-route는 모두 변경 전에 inventory했다. 이 보고서는 neon-tactics 범위다. 다른서비스/gallery/rankingserver NOT_INSPECTED/NOT_MODIFIED.

## 실행 결과

- `npm test`: 50/50 PASS, fail/skipped0. 기존44+신규6. 신규5개는 unchanged-baseline PASS coverage additions이며 RED_GREEN 아님.
- `node --test test/edge.test.js`: BEFORE 5PASS/1FAIL; AFTER 6/6PASS.
- `npm run check` 및 `git diff --check` PASS. 편집 텍스트만 UTF-8 without BOM/CRLF 정규화.
- `node tools/edge-browser.mjs http://127.0.0.1:51101/`: actual isolated Chrome/loopback primary+negative flows PASS. 동일 `--probe-ime` command BEFORE FAIL→AFTER PASS; 동일 `--probe-clear` FAIL→PASS.
- 기존 .github/workflows/pages.yml의 npm test가 신규 Node tests를 실행한다. Browser harness는 현 CI 미실행/manual. REMOTE_CI/LIVE NOT_RUN.
- 재실행: `npm run dev -- 0`의 출력 URL을 harness에 전달. 기존 ../output/playwright/implement-20261012/node_modules/playwright/index.mjs(Playwright1.61.1) 사용; 다른설치는 PLAYWRIGHT_MODULE로 absolute module file 지정. Chrome C:/Program Files/Google/Chrome/Application/chrome.exe, headless/muted/ephemeral context. 개인browser profile에 접근하지 않음.
- 완료 후 owns-only preview process만 종료하며 부모59540 integration server 유지. No commit/push/deploy/delegation.

## 신규 실행 테스트

E번호는 문서참조다. 모두 test/edge.test.js; `node --test test/edge.test.js` 또는 `npm test`로 실행.

| ID | 실제 test name | baseline → after |
| --- | --- | --- |
| E1 | `edge: coordinate type and nonfinite commands preserve AP and actors` | PASS→PASS(new coverage) |
| E2 | `edge: undo from a real victory restores planning and replay branch` | PASS→PASS(new coverage) |
| E3 | `edge: rejected ranked input and mutated snapshots never alter captured log` | PASS→PASS(new coverage) |
| E4 | `edge: illegal replay after valid prefix does not mutate caller or saved best` | PASS→PASS(new coverage) |
| E5 | `edge: corrupt oversized private loads preserve bytes and sibling keys` | PASS→PASS(new coverage) |
| E6 | `edge: private write must confirm readback before publishing progress` | FAIL→PASS(readback fix) |

## Feature / boundary matrix

다음 표시한 Node tests(`npm test`) 및 B=tools/edge-browser.mjs의 실제 check 범위만 VERIFIED/PASS다. 기존 tests의 file prefix는 test/의 해당 *.test.js. 새 case가 없는 경계는 existing으로 명시한다.

| Feature / boundary | 실제 test / command mapping | cases / result |
| --- | --- | --- |
| Command / input / AP | E1; model: two actions per unit and three shared AP are real limits; unused AP may be yielded | VERIFIED/PASS: Coordinates-1/8/fraction/type/NaN/Infinity reject AP/actors unchanged; legal two-step movement; shared3/unit2 action limits. |
| Terminal / undo / branch | E2/E4; model: doing nothing on master mission loses real city/units; failure score is zero | VERIFIED/PASS: Real victory→undo→same final command restores5900; terminal hint/illegal suffix reject; caller and best unmodified. |
| Capture / aliases / bounds | E3; replay-storage: 128 actual input limit remains legal until exact boundary; ranked rejects unknown/oversized/malformed/illegal/budget-exceeding and terminal commands | VERIFIED/PASS: Rejected input atomic; start/snapshot detached; fresh starts empty;128/129 practice;20/21 ranked; hint/undo locked. |
| Objectives / preview / oracle | objectives: objective N has legal deterministic witness and complete preview; model: wall impact is independently 1 skill damage plus 2 collision damage; ordered enemy friendly fire cancels dead shooters; exact forecast includes chain and unit damage | VERIFIED/PASS: 13–16 escort/escape/hold/master objectives and real failure/blocked/deadline/city/all-alive/skill10 limits. Shared preview equivalence separated from independent hit/order fixture. |
| Corrupt import / records | E4/E5; replay-storage: reject stale, malformed, oversized, extra data and fabricated scores atomically | VERIFIED/PASS: Bad JSON/version/score/state/illegal replay/id/assisted lane;128KiB UTF8 cap; stored corrupt bytes/sibling keys preserved. |
| Storage / failed clear / quota | E6; replay-storage: durable independent completion alone updates gallery; blocked save cannot claim durable progress; B --probe-clear | VERIFIED/PASS: Unconfirmed readback blocks private-success and shared write. removeItem-denial retains confirmation/current/restore/private records. Browser quota allows real end turn. |
| Cancel / restart / restore | replay-storage: save restores each accepted action/end/undo via replay, including objective state; B cancel target preserves AP; existing ui-regression | VERIFIED/PASS: Target cancellation does not spendAP; actual tutorial5900 dismissed/restore shows result; clear cancel; width input target/cancel. |
| Scoring / fixed fair challenge | ranked: ranked public contract reconstructs actual fixed challenge with bounded plain result; all16 witnesses | VERIFIED/PASS: UI final actual4280 and practice-save bytes retained; tieBreak[5,12,0,6]; no wall-clock scoring. |
| Keyboard / IME / focus | B: IME composition must preserve private run; IME composition must preserve focus; --probe-ime | NEW RED_GREEN: isComposing/legacy229에서 state/focus 보존. 합성 KeyboardEvent fixture; real OS IME 후보창 NOT_RUN. 일반키보드 입력은 actual primary flow. |
| Desktop / mobile | B: document fits 1440/390/320 + width별 pad/keyboard/undo/cancel checks | VERIFIED 1440×1000/390×900/320×900 actual UI input·3screenshots 열어서 visual QA. Physical touch/다른browser/screen reader NOT_RUN. |
| Storage failure / corrupted reload | B: corrupt import retains raw; corrupt load does not delete sibling; quota is visible; gameplay continues | NEW fixture: malformed localStorage/Storage.setItem QuotaExceededError. 물리적으로quota를채운시험아님; oversize는Node. |
| Repeat / rapid / late | 위terminal/undo/capture cases | VERIFIED 표시한 연속·거절·종료·restart. New auto-repeat/rapid double-click/pointercancel/two-tab exhaustive race NOT_RUN. |
| Async failures / races | B: ranking failure enables retry (intercepted GET503) | Explicit 조회503/retry/일반플레이요청0. Late ticket/identity/races PARENT_OWNED/NOT_RUN HERE. |

## Failing test first / minimal fixes

1. Production 변경 전 `node --test test/edge.test.js` 실행. 실제 assertion: `unconfirmed private write must fail / true !== false`. setItem만으로durable성공을보고했다. storage.js에서 own private key 동일 raw readback만 추가. null/stale/throwingread는false, input/기록보존; NEONsharedprogress도미발행. SAME test PASS. Payload/rules/schema/retention unchanged. Readback은cross-tab transaction/disk durability 보증이 아니다.
2. 키보드 handler 변경 전 `node tools/edge-browser.mjs http://127.0.0.1:51101/ --probe-ime` 실행. 실제실패: `IME composition must preserve private run` (ECHO up기록이echo로되감김 / NEON end input추가 / PARCEL sorter dir0→1). app.js 첫줄isComposing/keyCode229 guard추가. SAME probe PASS; scoring/replay rules unchanged.
3. 별도 `--probe-clear`: 기존 handler에서 removeItem SecurityError주입→`failed clear keeps confirmation open / false !== true` FAIL. 삭제실패시 early return으로 confirmation/restore/current/save/capture 보존. SAME command PASS. Node totals에포함하지않는 manual browserregression.

Ignored evidence: `output/playwright/edge-20261013/node-before.txt`, `ime-before.json`(실제실패), `ime-result.json`(같은probe PASS), `browser-result.json`(전체flow PASS), `clear-before.json`, `clear-result.json`, `clear-denied.png`. 테스트harness 초반 hidden-control timeout은 닫힌campaign/접힌details를열지않은 QA 준비오류; 실제 모달/summary click으로고쳤고 assertion을약화하지않았다. Production bug로집계안함.

## Actual browser flow / screenshots

기존ui-regression으로 실제 입문5900/닫기/복원. 목표취소/AP 보존. 실제 기체 선택·기술/이동·화살표목표·확인/적턴으로 최종임무4280 완료; 연습 저장 동일. 캡처는 새 ranked 시도1턴/전력12·목표취소·가로챈503 순위실패.

Negativeflows: 삭제/목표취소 또는한도실패 + corruptreload + quota injection. NEON/PARCEL의503은endpoint interception이며 실제server장애증거아님. 게임state/score/victory injection없음. Witness/plan을 Node에서읽고 실제UI 입력을안내한다.
Reusable QA: tools/ui-regression.cjs를읽고실제로호출. Captures `output/playwright/edge-20261013/view-1440.png`, `view-390.png`, `view-320.png`.
Visible UI change: 삭제거부시확인창유지. Screenshot refresh 필요: clear-denied.png(confirmation visible/restore enabled/current retained). 일반gallerypreview교체는부모판단.

## Source inventory / review coverage

- Named neon-tactics repo PARTIAL: 전체path inventory 후 task-related파일선택. Inventory를full-file review로주장하지않음.
- VERIFIED authoritative: architecture.md > requirements.md > README.md(api-spec없음); docs/decisions.md, package.json, .gitattributes, .gitignore, .github/workflows/pages.yml. Repo AGENTS없음; 사용자AGENTS준수.
- VERIFIED relevant source/tests/tools: model.js, replay.js, storage.js, progress.js, ranking.js, ranked.js, ranking-client.js, app.js; all test/*.test.js; tools/objective-witnesses.mjs, ui-regression.cjs, check.mjs, serve.mjs.
- PARTIAL auxiliary/history: levels.js의 큰legacy data 출력 일부가 잘려1/12 및13–16 목표/registry를 선택 검토. legacy witnesses.mjs는 실행하지만 전수 독서 제외. index.html은 관련controls/모달 선택검토. render.js/전체CSS 전수 독서 제외. docs/verification.md는latest 관련내용/통합지침 selected review;이전LIVE이력전수재검사안함.
- NOT_INSPECTED: .gitobjects/node_modules전수/credentials/.env(열지않음)/unrelatedrepos/gallery/rankingserver. Task/secret범위와unchanged auxiliary files라서선택제외.
- Root existing Playwright package.json 존재/version확인. 새runtime dependency없음. 아래 tracked baseline inventory;ignored QA/node_modules제외.

```text
dist/src/app.js
dist/src/storage.js
.gitattributes
.github/workflows/pages.yml
.gitignore
README.md
architecture.md
dist/favicon.svg
dist/index.html
dist/ranking.css
dist/src/app.js
dist/src/levels.js
dist/src/model.js
dist/src/progress.js
dist/src/ranked.js
dist/src/ranking-client.js
dist/src/ranking.js
dist/src/render.js
dist/src/replay.js
dist/src/storage.js
dist/styles.css
docs/decisions.md
docs/provenance.md
docs/verification.md
package.json
requirements.md
test/model.test.js
test/objectives.test.js
test/ranked.test.js
test/replay-storage.test.js
tools/check.mjs
tools/objective-witnesses.mjs
tools/serve.mjs
tools/ui-regression.cjs
tools/witness-solver.mjs
tools/witnesses.mjs
```

## Parent integration — shared ranking client

부모 통합에서 web-lab-ranking/client/ranking-client.js를 동일 bytes로 반영했다. 아래의 NOT_RUN HERE/copy unchanged는 보조 담당 반환 시점 기록이며 이번 부모 통합과 구분한다. identity 저장 readback·storage.clear·늦은 start/delete·잘못된 board/runId/deleted 응답 회귀는 서버 repo의 test/client-edges.test.js 11개로 검증했다. timeout/double click/cancel 경계도 포함되며 DOM/storage/fetch/clock doubles를 사용했다.

실제 Chrome에서 NEON16/4280·PARCEL14/1457 합법 조작과 로컬 workerd의 점수 재검증/등록/조회/삭제16검사 PASS. 이 게임의 API 실패/복구6시나리오는 response fixture다. 공개 POST/DELETE0이며 운영 쓰기/부하를 검증했다는 뜻이 아니다. 고정 규칙8파일/manifest와 client3 copies equality를 별도 검사한다. 상세 서버 한계와 배포 증거는 [전체 감사](https://github.com/HyungminYoon1/web-lab/blob/main/docs/edge-cases-20261013.md) 및 [서버 감사](https://github.com/HyungminYoon1/web-lab-ranking/blob/main/docs/edge-cases-20261013.md)에 기록한다. 로컬413 후속 연결 오류 PARTIAL/미해결도 유지한다.

## Remaining untested / N/A / integration

Shared transport async late-ticket/races 및 identity-storage denied/readback: PARENT_OWNED / NOT_RUN HERE. Parent audits web-lab-ranking/client/ranking-client.js; copies NOT_MODIFIED. Only intercepted GET board503; production writes0. File-upload import N/A (local replay decode only).

모든seed/캠페인을 개별browser완료한것아님. 모델witnesses는저작계약/표본의실행검증이다. RealOSIME/physicaldevices/allviewport+zoom+device/screenreaders/multi-tabwrite+clear/realbrowser eviction/allasyncinterleavings/WorkerCPU/humanfun+difficulty/remoteCI/LIVE/deploy NOT_RUN. Scoped-key isolation은same-origin browser security isolation증명이아님.
Changed files: dist/src/app.js, dist/src/storage.js, new test/edge.test.js, new tools/edge-browser.mjs, new docs/edge-cases-20261013.md, docs/verification.md(newtop), docs/decisions.md(D12). 기존 legitimate tests/user records/rules/versions/maps/retention/storage schema 보존. Parent integrates/releases.
