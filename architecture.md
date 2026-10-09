# NEON TACTICS — 내일의 공격 architecture

## Authority and scope

Independent static GitHub Pages game at /neon-tactics/. Only dist is public site output. Preserve all other repositories; no existing game code is merged. The approved 2026-10-09 extension adds an optional external ranking transport for fixed mission 16 only. Ordinary play has no backend dependency; the separately owned web-lab-ranking service performs verification/storage. No runtime packages, personal login, analytics or paid infrastructure.

## Separation

- dist/src/model.js: pure deterministic state/rules/scoring, validated bounded commands, no DOM, clock, browser globals, network or storage.
- dist/src/levels.js: authored campaign/scenario data and pure validated transforms; not UI. Solutions belong in test fixtures, not silent score manipulation.
- dist/src/replay.js / ranked.js: pure bounded replay validation; ranked.js exports the approved server-facing definition and deterministic scoring entry point. ranking.js captures fresh actual ranked inputs. No transport.
- dist/src/storage.js / progress.js: bounded local persistence and minimal gallery summary only. Practice/tutorial autosave; ranked attempts remain separate in memory.
- dist/src/ranking-client.js and ranking.css: optional explicit public-record UI/HTTP adapter. Reads only its shared anonymous credential key; no private campaign record is sent. No automatic network call on load, no automatic submission. Scores are server recomputed, not accepted from browser state.
- dist/src/app.js: DOM/input orchestration, lifecycle, keyboard/touch adapters, explicit pause/retry and rendering scheduling. Rendering may be split into render.js; rules never move into rendering.
- dist/index.html and styles.css: Korean semantic shell, HUD/menus, responsive/reduced-motion presentation.
- test/: Node model/rule tests and campaign witnesses; not a substitute for actual browser play.
- tools/: loopback-only preview and read-only public checks, never deployed.
- .github/workflows/pages.yml: pinned verify-before-publish, dist-only artifact, deploy-scoped permissions.

## Bounds and privacy

Approved persistence revision (D05–D07): storage.js alone accesses device-local storage for a versioned, bounded current replay and independent/assisted best replays. replay.js validates commands and reconstructs state with the pure model; serialized scores/states are never authoritative. progress.js writes only the minimal allowlisted web-lab-progress-v1 aggregate. Optional ranking-client.js owns web-lab-ranking-identity-v1 only: version/playerId/random opaque credential. It sends commands and optional public nickname only after deliberate challenge/submission actions. CSP connect-src allows only https://web-lab-ranking.hyeongmin92.workers.dev. No cookies, service worker, user files, external assets or audio autoplay. Private records remain device-local and editable; they never serve as submitted public scores.

Campaign v1 missions 1–12 remain unchanged. Campaign v2 adds missions 13–16: escort, escape, hold, and fixed-condition master defense/hold. Model rules remain deterministic and independent of UI/storage/clock. app.js exports rankingAdapter start/getActions/isComplete/getDefinition. ranked.js uses neon-2.0.0 / neon-master-16-v2, at most 20 move/skill/endTurn commands, and recomputes score plus ascending tie-break values. Ranked retry is fresh, hints/undo disabled, no wall-clock scoring. Public ranking is opt-in, preserves private play and shows actual returned records only. Server can verify legal inputs, not human-only play or distinct persons.

Use fixed bounded game ticks/turns and validated action enumerations. Undo/replay/history, entities, campaign choices and simulation work must have explicit finite ceilings recorded in decisions. Same scenario plus action sequence reproduces actual state. Page hide freezes scheduling and clears held input, returning does not silently resume. Reset cancels prior work. No synthetic delay or mocked victory represents real browser gameplay.

## Visual direction

Rain-soaked neon tactical diorama with dimensional buildings, readable rooftops, distinctive robot silhouettes, raised terrain and red enemy intent beams, bright selected-unit paths and restrained impact particles. Dominant battlefield, contextual action strip, not generic dashboards.

Original code-native Canvas/SVG/CSS art rather than copied commercial assets. Desktop battlefield is dominant and starts visible; compact real game HUD and contextual controls. 320/390px must remain usable, with a scrollable board where necessary rather than tiny illegible controls. Keyboard paths, text state, focus visibility, non-color-only objective indicators, and reduced-motion support.

## Delivery and encoding

Node.js 22+, no install required. Existing pinned GitHub Pages pattern; owner is HyungminYoon1. User authorized publication after verification. Commit/push/remote creation are parent integration responsibilities after code/browser/privacy checks. UTF-8 without BOM, CRLF text; binary images are explicitly marked. No .env/credentials/private identity in public files.
