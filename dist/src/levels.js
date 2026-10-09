const data=[
 {
  "id": 1,
  "name": "첫 번째 예고",
  "chapter": 1,
  "grade": "GUIDE",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 3,
    "y": 5,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 1,
    "y": 4,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 6,
    "y": 5,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 3,
    "y": 7,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 0,
    "y": 0
   }
  ],
  "water": [
   {
    "x": 1,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 7,
    "y": 6
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 4,
      "dir": 1,
      "hp": 3,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 1,
      "dir": 1,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 6,
      "y": 3,
      "dir": 1,
      "hp": 1,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 6,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 6/12 이상을 지키며 3기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 2,
  "name": "탄도의 사각",
  "chapter": 1,
  "grade": "HARD",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 1,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 3,
    "y": 1,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 2,
    "y": 6,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 0,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 7,
    "y": 0
   }
  ],
  "water": [
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 1,
    "y": 7
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 3,
      "dir": 2,
      "hp": 3,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 1,
      "dir": 2,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 4,
      "y": 6,
      "dir": 2,
      "hp": 1,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 7,
      "y": 6,
      "dir": 2,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 3,
      "y": 7,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 6,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 6/12 이상을 지키며 5기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 3,
  "name": "끌어당긴 위험",
  "chapter": 1,
  "grade": "HARD",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 4,
    "y": 2,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 7,
    "y": 3,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 1,
    "y": 2,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 4,
    "y": 0,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 7,
    "y": 7
   }
  ],
  "water": [
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 2,
    "y": 5
   },
   {
    "x": 7,
    "y": 4
   },
   {
    "x": 0,
    "y": 1
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 3,
      "dir": 3,
      "hp": 3,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 6,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 1,
      "y": 4,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 1,
      "y": 7,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 0,
      "y": 3,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 6,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 6/12 이상을 지키며 5기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 4,
  "name": "광장의 교환",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 5,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 4,
    "y": 6,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 5,
    "y": 1,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 7,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 2,
    "y": 3
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 0,
    "y": 7
   }
  ],
  "water": [
   {
    "x": 2,
    "y": 6
   },
   {
    "x": 2,
    "y": 2
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 6,
    "y": 0
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 4,
      "dir": 0,
      "hp": 3,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 6,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 3,
      "y": 1,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 0,
      "y": 1,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 4,
      "y": 0,
      "dir": 1,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 7,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 7/12 이상을 지키며 5기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 5,
  "name": "충돌의 연쇄",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 3,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 1,
    "y": 4,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 6,
    "y": 5,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 3,
    "y": 7,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 0,
    "y": 0
   }
  ],
  "water": [
   {
    "x": 1,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 7,
    "y": 6
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 4,
      "dir": 1,
      "hp": 3,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 1,
      "dir": 1,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 6,
      "y": 3,
      "dir": 1,
      "hp": 2,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 6,
      "y": 0,
      "dir": 1,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 7,
      "y": 4,
      "dir": 2,
      "hp": 2,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 7,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 7/12 이상을 지키며 5기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 6,
  "name": "두 번째 침입",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 2,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 3,
    "y": 0,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 2,
    "y": 6,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 0,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 7,
    "y": 0
   }
  ],
  "water": [
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 1,
    "y": 7
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 3,
      "dir": 2,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 1,
      "dir": 2,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 4,
      "y": 6,
      "dir": 2,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 7,
      "y": 6,
      "dir": 2,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 3,
      "y": 7,
      "dir": 3,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 4,
      "y": 3,
      "dir": 2,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 4,
      "y": 4,
      "dir": 2,
      "hp": 1,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 5,
  "minCityHp": 8,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 8/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 7,
  "name": "막다른 방벽",
  "chapter": 3,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 4,
    "y": 2,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 6,
    "y": 3,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 1,
    "y": 2,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 4,
    "y": 0,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 5,
    "y": 2
   }
  ],
  "water": [
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 2,
    "y": 5
   },
   {
    "x": 7,
    "y": 4
   },
   {
    "x": 0,
    "y": 1
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 3,
      "dir": 3,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 6,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 1,
      "y": 4,
      "dir": 3,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 1,
      "y": 7,
      "dir": 3,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 0,
      "y": 3,
      "dir": 0,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 4,
      "y": 4,
      "dir": 3,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 3,
      "y": 4,
      "dir": 3,
      "hp": 1,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 8,
  "name": "도시의 잔량",
  "chapter": 3,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 6,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 4,
    "y": 6,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 5,
    "y": 1,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 7,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 2,
    "y": 3
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 5,
    "y": 5
   }
  ],
  "water": [
   {
    "x": 2,
    "y": 6
   },
   {
    "x": 2,
    "y": 2
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 6,
    "y": 0
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 4,
      "dir": 0,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 6,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 3,
      "y": 1,
      "dir": 0,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 0,
      "y": 1,
      "dir": 0,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 4,
      "y": 0,
      "dir": 1,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 3,
      "y": 4,
      "dir": 0,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 3,
      "y": 3,
      "dir": 0,
      "hp": 1,
      "kind": "beam",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 9,
  "name": "폭발의 반경",
  "chapter": 3,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 3,
    "y": 5,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 0,
    "y": 4,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 6,
    "y": 5,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 3,
    "y": 7,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 2,
    "y": 5
   }
  ],
  "water": [
   {
    "x": 1,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 7,
    "y": 6
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 4,
      "dir": 1,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 1,
      "dir": 1,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 6,
      "y": 3,
      "dir": 1,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 6,
      "y": 0,
      "dir": 1,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 7,
      "y": 4,
      "dir": 2,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 3,
      "y": 3,
      "dir": 1,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 4,
      "y": 3,
      "dir": 1,
      "hp": 1,
      "kind": "bomb",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 10,
  "name": "가까운 미래",
  "chapter": 4,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 2,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 3,
    "y": 1,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 2,
    "y": 6,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 0,
    "y": 3,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 2,
    "y": 2
   }
  ],
  "water": [
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 1,
    "y": 7
   },
   {
    "x": 1,
    "y": 5
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 3,
      "y": 3,
      "dir": 2,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 1,
      "dir": 2,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 4,
      "y": 6,
      "dir": 2,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 7,
      "y": 6,
      "dir": 2,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 3,
      "y": 7,
      "dir": 3,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 4,
      "y": 3,
      "dir": 2,
      "hp": 3,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 4,
      "y": 4,
      "dir": 2,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 11,
  "name": "세 개의 명령",
  "chapter": 4,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 4,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 6,
    "y": 3,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 1,
    "y": 2,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 4,
    "y": 0,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 1,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 5,
    "y": 2
   }
  ],
  "water": [
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 2,
    "y": 5
   },
   {
    "x": 7,
    "y": 4
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 2,
    "y": 1
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 3,
      "dir": 3,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 6,
      "y": 6,
      "dir": 3,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 1,
      "y": 4,
      "dir": 3,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 1,
      "y": 7,
      "dir": 3,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 0,
      "y": 3,
      "dir": 0,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 4,
      "y": 4,
      "dir": 3,
      "hp": 3,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 3,
      "y": 4,
      "dir": 3,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 },
 {
  "id": 12,
  "name": "네온의 마지막 밤",
  "chapter": 4,
  "grade": "MASTER",
  "width": 8,
  "height": 8,
  "units": [
   {
    "id": "R",
    "role": "ram",
    "name": "BREAKER",
    "x": 5,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "H",
    "role": "hook",
    "name": "ANCHOR",
    "x": 4,
    "y": 7,
    "hp": 3,
    "maxHp": 3
   },
   {
    "id": "S",
    "role": "swap",
    "name": "PHASE",
    "x": 5,
    "y": 1,
    "hp": 3,
    "maxHp": 3
   }
  ],
  "buildings": [
   {
    "id": "C1",
    "name": "전력탑",
    "x": 7,
    "y": 4,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C2",
    "name": "중계기",
    "x": 6,
    "y": 6,
    "hp": 4,
    "maxHp": 4
   },
   {
    "id": "C3",
    "name": "주거동",
    "x": 6,
    "y": 1,
    "hp": 4,
    "maxHp": 4
   }
  ],
  "blocks": [
   {
    "x": 2,
    "y": 4
   },
   {
    "x": 2,
    "y": 3
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 5,
    "y": 5
   }
  ],
  "water": [
   {
    "x": 2,
    "y": 6
   },
   {
    "x": 2,
    "y": 2
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 6,
    "y": 2
   }
  ],
  "waves": [
   {
    "turn": 1,
    "enemies": [
     {
      "id": "E1",
      "x": 4,
      "y": 4,
      "dir": 0,
      "hp": 4,
      "kind": "beam",
      "range": 4,
      "damage": 2
     },
     {
      "id": "E2",
      "x": 1,
      "y": 6,
      "dir": 0,
      "hp": 2,
      "kind": "beam",
      "range": 5,
      "damage": 2
     },
     {
      "id": "E3",
      "x": 3,
      "y": 1,
      "dir": 0,
      "hp": 3,
      "kind": "blast",
      "range": 4,
      "damage": 1
     }
    ]
   },
   {
    "turn": 2,
    "enemies": [
     {
      "id": "E4",
      "x": 0,
      "y": 1,
      "dir": 0,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     },
     {
      "id": "E5",
      "x": 4,
      "y": 0,
      "dir": 1,
      "hp": 3,
      "kind": "beam",
      "range": 7,
      "damage": 2
     }
    ]
   },
   {
    "turn": 3,
    "enemies": [
     {
      "id": "E6",
      "x": 3,
      "y": 4,
      "dir": 0,
      "hp": 3,
      "kind": "bomb",
      "range": 4,
      "damage": 1
     },
     {
      "id": "E7",
      "x": 3,
      "y": 3,
      "dir": 0,
      "hp": 2,
      "kind": "bomb",
      "range": 4,
      "damage": 2
     }
    ]
   }
  ],
  "maxTurns": 6,
  "minCityHp": 10,
  "actionsPerTurn": 3,
  "brief": "공격 예고를 바꾸고 시설 전력 10/12 이상을 지키며 7기의 침입자를 제거하세요.",
  "hint": "BREAKER는 벽 충돌로 큰 피해를 주고, ANCHOR는 물로 끌어 즉시 제거할 수 있습니다. PHASE로 공격선을 옮긴 뒤 턴 종료 미리보기에서 적의 아군 오사를 확인하세요."
 }
];
export const levels=Object.freeze(data.map(level=>Object.freeze(level)));
export function getLevel(id){const level=levels.find(l=>l.id===id);if(!level)throw new RangeError("Unknown mission");return level;}
