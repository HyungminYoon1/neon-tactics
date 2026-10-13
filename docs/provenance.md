# 2026-10-13 학습 과제의 근거

호송/탈출/점유 과제는 기존 13–15번 목표의 동작을 비교하는 원문 연습이다. 공격 순서가 뒤 공격에 미치는 영향은 실제 순차 resolve 모델을 근거로 했다.

- 규칙의 1차 근거: [모델](../dist/src/model.js)의 resolve/resolveObjective/applyAction/endTurn, [임무](../dist/src/levels.js).
- 실행 근거: [목표별 합법 입력 증거](../tools/objective-witnesses.mjs), [성공·실패·중단 점유 검증](../test/objectives.test.js).
- 13번 적 전멸만으로 호송 완료가 되지 않음, 14번 탈출 기체의 제거, 15번 점유 초기화는 기존 시험으로 대조했다. 16번 랭킹 해답 안내를 추가하지 않았다.
