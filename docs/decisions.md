# Decisions

## D10 — Dismiss completed result without resetting the run

- Context: actual 320/390px browser testing found the fixed completion panel blocking public-record controls.
- Options: reset the completed run; remove the result panel; provide a separate close action.
- Decision: add a keyboard-accessible result-close button. Closing only hides the panel and focuses the board; score, completed state and captured actions remain unchanged. A new attempt resets dismissal.
- Rationale: completion should not prevent opt-in registration or deleting an existing public record on small screens.
- Affected: dist/index.html, dist/src/app.js.
- Review: replay the legal final solution, close at mobile widths, submit and delete the actual test record; no result/score injection.

## D09 — Explicit free public ranking integration (supersedes no-network clauses)

- Context: user approved a free ranking server, then restricted it to extremely hard, equal-condition games. This app's fixed final challenge is selected; no other levels submit.
- Options: publish client scores; database-only browser access; bounded server replay in a separate API.
- Decision: opt-in start/submit/view/delete UI in ranking-client.js; exact Cloudflare Worker origin in CSP; anonymous 256-bit bearer credential in web-lab-ranking-identity-v1. Reuse fixed ranked rules and action limits. Only verified bests are public; ties do not depend on arrival time or device speed. Final rules require a version bump if changed. Ordinary play remains offline; loading a page makes no ranking request. API stores nickname, opaque identity and private verification commands, expires after 180 inactive days, and deletes the identity's records in both ranked games on authenticated request. Cloudflare Workers Free plus SQLite Durable Object, bounded fail-closed quotas, no paid upgrade or other provider resource.
- Rationale: same authored opportunity and deterministic scoring; no invented ranks or direct database credentials in Pages. This does not prove human-only play, distinct humans or measured human difficulty.
- Affected: dist/src/ranking-client.js, dist/ranking.css, dist/index.html, app.js, tools/check.mjs, architecture/requirements/README; separate web-lab-ranking service.
- Review: main tests actual UI opt-in, legal input capture, server submission/query/delete, denied requests, reload, mobile layout, live API and published rules consistency. No automatic posting, real names, emails, analytics or IP storage.

## D05 — Approved bounded local replay persistence

- Context: User explicitly authorized autosave, restore/clear and independent progress. This supersedes D02/D04's memory-only boundary for the fields below.
- Options: trust serialized state/score; store unbounded history; replay a bounded validated command log.
- Decision: one neon-tactics-save-v2 key, schema 2 and rules neon-2.0.0. At most 128 KiB UTF-8, one current run and two best replays per each of 16 missions. Each replay permits 128 accepted action/end/undo/hint events; command coordinates 0–7, units R/H/S. Undo keeps 32 snapshots. Rehydrate via model; reject malformed, stale or illegal replay atomically. Retain best independent and assisted results separately; hints and tutorial mark assisted permanently across undo. Failure/quota/disabled storage falls back to memory with a visible status. Restore never runs a command automatically. Clear removes this game's key and own gallery entry only. No names, wall-clock scoring, telemetry or network.
- Rationale: reproducible recovery without trusting saved scores; finite storage/CPU. Clearing persists until a new explicit game starts.
- Affected: replay.js, storage.js, app.js, tests, architecture/README/check.
- Review: main verifies reload, storage denial, multi-tab, clear and browser controls. No claim of server integrity. Ranked attempts use separate memory-only capture and do not overwrite practice saves/bests/summary. This narrows current-run autosave to practice/tutorial; a refreshed ranked attempt must start fresh.

## D06 — Additional objectives and fixed-condition master

- Context: preserve city defense while introducing positional goals and a fair ranking candidate.
- Options: replace old campaign; inflate enemy HP; append objective-specific missions.
- Decision: preserve v1 IDs 1–12, append v2 IDs 13–16. Escort: adjacent living unit advances the vulnerable convoy one authored route tile after enemy fire, if empty. Escape: move each living unit onto an exit; exited units leave occupancy/targeting. Hold: occupy both beacons for consecutive resolved enemy turns; lost occupancy resets streak. Master: original mission 12 geometry/waves plus 12/12 city power, all units alive, 10 total skills, four consecutive enemy turns holding the R beacon, and five-turn deadline. Score uses turns/actions/damage/kills only. Preview exposes full end-turn state including objective/spawn/failure.
- Rationale: different legal positional solutions and loss conditions without speed or hidden score injection.
- Affected: levels/model/render/app, objective witnesses/tests.
- Review: legal witnesses and negatives required; difficulty is an authored candidate, not a measured human rating. The approved ranked.js contract is implemented: 20 actual move/skill/endTurn actions maximum, rules neon-2.0.0, challenge neon-master-16-v2. app.js exports rankingAdapter start/getActions/isComplete/getDefinition; the visible #start-ranked starts the same flow. No SDK or transport is connected. Equal scores use ascending turns, commands, city HP loss, unit HP loss. Unlimited retries use identical fresh state; ranked undo/hints are rejected. Payloads contain no state/score/timestamp, with strict primitive fields making even 20 commands smaller than 2 KiB. Main owns Worker timing/provider validation and explicit opt-in submission/view.

## D07 — Minimal gallery summary

- Context: approved cross-app contract web-lab-progress-v1.
- Options: share private runs; minimal counts; no gallery badge.
- Decision: progress.js validates at most 15 known app IDs from the local service inventory and 8 KiB JSON. Entries contain only completed/total integers (0 <= completed <= total <= 1000) and a real ISO updatedAt. Recompute this app's count from replay-validated durable independent wins after successful save, never visits/tutorial/hints. Preserve valid other app entries; clear removes only neon-tactics. Do not touch sibling repositories.
- Rationale: gallery reads achievements without accessing run payloads; timestamp is local update metadata only.
- Affected: progress.js, storage.js, tests, architecture/README/check.
- Review: main checks the shared allowlist against its canonical 15 IDs. Malformed/oversized aggregates fail safely.

## D03 — 유한 게임 규칙과 재현 가능한 캠페인

- Context: 높은 난도와 실제 실패/성공이 있는 게임이며 무작위 데이터가 불가능한 문제를 만들면 안 됩니다.
- Options: 검증되지 않은 무작위 배치; 무한 시간/처리; 유한한 저작 캠페인과 실제 해답 검증.
- Decision: 8×8, 기체 3/시설 3/적 최대 7, 처리 엔티티 상한 16. 최대 6턴, 턴당 3명령/기체당 2행동, 취소 32 상태. 연쇄 밀기/폭발 상한 16. 효과 애니메이션만 430ms이며 게임 상태는 실제 명령 시에만 바뀝니다. 모든 명령은 순수 규칙으로 복제 상태를 계산하며 미리보기와 실행에서 동일 함수를 사용합니다. 적 턴은 생존 적의 순서대로 매 공격 당시 경로/첫 피격체를 다시 계산하고 폭발을 적용합니다. 종료 뒤 살아남은 적은 시설 방향으로 다음 의도를 정합니다. 예정 진입 칸이 막히면 가장 가까운 빈 칸(거리→행→열)에 진입합니다. 모든 진입을 마친 적 전멸과 최소 시설 전력이 승리 조건입니다.
- Rationale: 시간과 자원 제약이 실질적으로 작동하면서 같은 문제/행동으로 재현할 수 있습니다. 규칙과 UI를 분리하고 모든 저작 캠페인의 해답을 실제 모델로 실행합니다.
- Affected: dist/src/model.js, levels.js, app.js, test/model.test.js, tools/witnesses.mjs.
- Review: 23 model tests: 모든 임무의 실제 명령·시설·전멸 해답, 미리보기/실행 일치 및 예고/실제 공격 순서, 독립 충돌/수중/교환/행동 예산/폭발·죽은 사수 취소/실패/재현 사례. 난도 명칭과 모델 해답은 사람의 재미/난도 측정을 대신하지 않습니다.

## D04 — 읽을 수 있는 미리보기와 조작/복구

- Context: 어려운 퍼즐의 실패 원인을 읽고 같은 조건으로 다시 시도할 수 있어야 합니다.
- Options: 즉시 실패와 입력 재시도만 제공; 화면만 그린 가상 결과; 실제 상태 예고와 제한된 취소/리셋.
- Decision: 1/2/3 기체 선택, Q 이동/E 기술, 방향키 또는 클릭으로 목표 지정, Enter/Space 명령 확인, Z 되돌리기, T 적 턴. 모바일 칸 이동 패드와 확인 버튼도 같은 규칙을 사용합니다. 점수는 성공 점수는 실제 턴/명령/시설·기체 손실/제거 수로 계산합니다. 최고 기록은 페이지 메모리만 사용하고 조언 사용 기록과 분리합니다. 작은 화면은 내부 보드 스크롤로 판독 크기를 유지하고 결과는 화면 안에 표시합니다. 페이지 숨김/초점 이동 시 시간 예약 또는 효과 프레임을 취소하며 자동 재개하지 않습니다.
- Rationale: 사용자가 결과를 추적할 수 있고 재생 속도/렌더링은 규칙과 점수를 바꾸지 않습니다.
- Affected: dist/index.html, styles.css, app.js, render.js, README.md.
- Review: 1/7/12의 일반 기체·기술 선택, Canvas 목표 지정과 명령 확인으로 실제 성공했습니다. 5900/5160/4280점 일치를 확인했습니다. 키보드 기술, 명령/AP 취소, 실제 적 턴 취소, 전력 리셋과 미확정 목표 상태의 적 턴 차단을 확인했습니다. 실제 모바일 하드웨어와 사람의 체감 평가는 미검증입니다.

## D01 — 독립 정적 게임과 검증 후 공개

- Context: 사용자가 제안한 세 게임의 구현, 높은 난도/재미/실제 게임 디자인과 검증 후 바로 공개를 승인했습니다.
- Options: 기존 서비스에 병합; 서버/프레임워크 도입; 독립 browser-only 정적 저장소.
- Decision: 이 게임만 독립 저장소에서 구현하고 기존 Node22/pinned Pages 패턴으로 dist만 공개합니다. 규칙/시나리오/UI/렌더링을 분리하며 원격 생성/커밋/배포는 부모 작업에서 검증 후 수행합니다.
- Rationale: 기존 릴리스와 개인정보 경계를 보존하고 설치·유료 서버 없이 실제 게임을 실행합니다.
- Affected: architecture.md, requirements.md, dist, test, tools, .github/workflows.
- Review: 게임 모델/캠페인 해답, 실제 브라우저 조작, 공개 파일/CI를 독립적으로 확인합니다.

## D02 — 페이지 메모리와 원본 코드 기반 아트

- Context: 방문자 정보가 필요하지 않은 단일 플레이 게임이며 사용자가 개인적인 공개를 원하지 않습니다.
- Options: 계정/영구 점수/외부 자산; 현재 세션 상태와 직접 그린 SVG/Canvas/CSS.
- Decision: 계정·쿠키·방문자 영구 저장·전체 순위·분석·API를 넣지 않고 원본 코드 기반 아트와 현재 세션 상태만 사용합니다. 호스팅 로그는 앱 처리와 별개입니다.
- Rationale: 추가 개인정보/비용/라이선스 경계를 도입하지 않습니다.
- Affected: dist/src/app.js, rendering, CSP, README.md.
- Review: 영구 저장/오디오/서버를 도입하려면 별도 결정과 승인이 필요합니다. 게임의 유한 처리/반복/되돌리기 상한은 구현 후 추가 기록합니다.
