export const witnesses=[
 {
  "id": 1,
  "path": [
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 3
   }
  ],
  "expected": {
   "won": true,
   "turn": 1,
   "ap": 0,
   "power": 12,
   "minPower": 6,
   "unitHp": 10,
   "kills": 3,
   "total": 3,
   "score": 5900,
   "grade": "S"
  }
 },
 {
  "id": 2,
  "path": [
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 7
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 3,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 6
   }
  ],
  "expected": {
   "won": true,
   "turn": 3,
   "ap": 1,
   "power": 12,
   "minPower": 6,
   "unitHp": 10,
   "kills": 5,
   "total": 5,
   "score": 5420,
   "grade": "S"
  }
 },
 {
  "id": 3,
  "path": [
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "move",
    "unitId": "H",
    "x": 6,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 3
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 0,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 7
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 4
   }
  ],
  "expected": {
   "won": true,
   "turn": 3,
   "ap": 1,
   "power": 12,
   "minPower": 6,
   "unitHp": 8,
   "kills": 5,
   "total": 5,
   "score": 5220,
   "grade": "S"
  }
 },
 {
  "id": 4,
  "path": [
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 0
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 3,
    "y": 0
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 0
   }
  ],
  "expected": {
   "won": true,
   "turn": 3,
   "ap": 1,
   "power": 12,
   "minPower": 7,
   "unitHp": 8,
   "kills": 5,
   "total": 5,
   "score": 5280,
   "grade": "S"
  }
 },
 {
  "id": 5,
  "path": [
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 5
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 7,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 0
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 3
   }
  ],
  "expected": {
   "won": true,
   "turn": 4,
   "ap": 2,
   "power": 12,
   "minPower": 7,
   "unitHp": 8,
   "kills": 5,
   "total": 5,
   "score": 4940,
   "grade": "S"
  }
 },
 {
  "id": 6,
  "path": [
   {
    "type": "move",
    "unitId": "H",
    "x": 4,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 7
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 4,
    "y": 7
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 6
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 4,
    "y": 5
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 7
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 2,
   "power": 9,
   "minPower": 8,
   "unitHp": 8,
   "kills": 7,
   "total": 7,
   "score": 4140,
   "grade": "A"
  }
 },
 {
  "id": 7,
  "path": [
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 4
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 0,
    "y": 5
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 7
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 5
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 7
   }
  ],
  "expected": {
   "won": true,
   "turn": 4,
   "ap": 1,
   "power": 12,
   "minPower": 10,
   "unitHp": 10,
   "kills": 7,
   "total": 7,
   "score": 5160,
   "grade": "S"
  }
 },
 {
  "id": 8,
  "path": [
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 1
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 0
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 5,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 3,
    "y": 0
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 1
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 3,
    "y": 2
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 0
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 1,
   "power": 12,
   "minPower": 10,
   "unitHp": 6,
   "kills": 7,
   "total": 7,
   "score": 4480,
   "grade": "A"
  }
 },
 {
  "id": 9,
  "path": [
   {
    "type": "move",
    "unitId": "H",
    "x": 1,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 5
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 7,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 6,
    "y": 0
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 4,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 5,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 7,
    "y": 3
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 1,
   "power": 10,
   "minPower": 10,
   "unitHp": 7,
   "kills": 7,
   "total": 7,
   "score": 4160,
   "grade": "A"
  }
 },
 {
  "id": 10,
  "path": [
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 7
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "H",
    "x": 4,
    "y": 2
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 4,
    "y": 5
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 7,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 4,
    "y": 5
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 4,
    "y": 4
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 1,
   "power": 12,
   "minPower": 10,
   "unitHp": 6,
   "kills": 7,
   "total": 7,
   "score": 4480,
   "grade": "A"
  }
 },
 {
  "id": 11,
  "path": [
   {
    "type": "skill",
    "unitId": "H",
    "x": 6,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 4,
    "y": 3
   },
   {
    "type": "move",
    "unitId": "R",
    "x": 4,
    "y": 2
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 4,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 3
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 4
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 2,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 7
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 2,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 1,
    "y": 7
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 1,
   "power": 12,
   "minPower": 10,
   "unitHp": 8,
   "kills": 7,
   "total": 7,
   "score": 4620,
   "grade": "A"
  }
 },
 {
  "id": 12,
  "path": [
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 4
   },
   {
    "type": "move",
    "unitId": "H",
    "x": 3,
    "y": 6
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 1,
    "y": 6
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 1
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "R",
    "x": 3,
    "y": 4
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 4,
    "y": 0
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 3,
    "y": 3
   },
   {
    "type": "end"
   },
   {
    "type": "move",
    "unitId": "S",
    "x": 3,
    "y": 2
   },
   {
    "type": "skill",
    "unitId": "S",
    "x": 0,
    "y": 1
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 3,
    "y": 2
   },
   {
    "type": "end"
   },
   {
    "type": "skill",
    "unitId": "H",
    "x": 3,
    "y": 3
   }
  ],
  "expected": {
   "won": true,
   "turn": 5,
   "ap": 2,
   "power": 12,
   "minPower": 10,
   "unitHp": 4,
   "kills": 7,
   "total": 7,
   "score": 4280,
   "grade": "A"
  }
 }
];
