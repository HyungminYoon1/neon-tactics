# NEON TACTICS — 내일의 공격 requirements

The user selected this game and requested substantial challenge, fun and real-game presentation. These are implementation targets, not claims of completed features.

- A compact tactical battlefield (around 6x6 to 8x8) with three differentiated friendly units, enemy attack intents announced before the player turn, and a finite shared action budget. Distinguish movement and skill costs clearly.
- Campaign target: 12 varied demanding missions, including at least six compound advanced encounters. Enemies should have distinct directional/area/ranged intents and priorities; pure health inflation is not difficulty design.
- Protect structures or objectives while solving positional problems with pushes, pulls or swaps and at least one meaningful chain effect (explosives, electricity or environmental hazard). Model friendly fire and blocking consistently.
- User preview must equal the actual next state for the chosen action, including chain effects, collisions and redirected enemy intent. Invalid commands rejected without consuming actions.
- Show exact targeted tiles, anticipated damage, attack order and friendly/structure health. Include unit selection, movement highlights, skill targeting, cancel, bounded undo during planning, end turn, restart and clear victory/failure.
- Campaign witnesses (action sequences) must run through real rules for every authored mission. Negative fixtures should lose real objectives. Test independent preview/actual equivalence, push/block/chain, attack resolution order and undo boundaries.
- Draw original distinctive robots, buildings and ground details with perspective/depth and concise effects; semantic DOM controls remain available. Keyboard-only grid/unit/skill/target selection as well as click/touch.
- Daily/replay variations only if solvability is checked or use authored transformations that preserve rules; never present purely visual randomness as strategic variation.
- A campaign selection modal and in-world briefing should allow jumping to advanced missions; avoid huge marketing landing page. Tutorial can use the same controls and must not be the main hard content.
- Practice/reference assistance if available is separated from independent scores. No server rank or pretend multiplayer; gameplay works offline after static assets load.

## Acceptance

- Complete playable campaign with honest finite difficulty and validated solvability, not a decorative prototype or lab controls with pretend game results.
- Pure rules and UI remain separate. Test normal/negative/boundary/replay/undo/lifecycle cases, then actual browser input at desktop/390/320 with no document overflow/console failures.
- Document exact mechanics, witnesses, bounds, test types, local browser evidence and any NOT_RUN. A human difficulty/fun rating cannot be asserted from model tests alone.
- Original code and code-native art; no external content/license dependence. No global rankings/server/cloud persistence; reuse static Pages.
