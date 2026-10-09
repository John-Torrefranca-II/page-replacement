if (typeof require !== "undefined") {
  var { simulate } = require("../algorithms.js");
}

const cases = [
  {
    id: "TC-01 textbook",
    refs: [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1],
    frames: 3,
    expected: { FIFO: 15, LRU: 12, OPT: 9 },
  },
  {
    id: "TC-02 Belady, 3 frames",
    refs: [1,2,3,4,1,2,5,1,2,3,4,5],
    frames: 3,
    expected: { FIFO: 9 },
  },
  {
    id: "TC-03 Belady, 4 frames",
    refs: [1,2,3,4,1,2,5,1,2,3,4,5],
    frames: 4,
    expected: { FIFO: 10 },
  },
  {
    id: "TC-04 one frame (every change is a fault)",
    refs: [1,1,2,2,1],
    frames: 1,
    expected: { FIFO: 3, LRU: 3, OPT: 3 },
  },
];

cases.forEach((c) => {
  for (const algo in c.expected) {
    const actual = simulate(c.refs, c.frames, algo).faults;
    const ok = actual === c.expected[algo];
    console.log(`${ok ? "PASS" : "FAIL"}  ${c.id}  ${algo}: expected ${c.expected[algo]}, got ${actual}`);
  }
});

const tb = [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];
const lru = simulate(tb, 3, "LRU");
const ratiosOk =
  lru.hits === 8 && lru.faults === 12 &&
  lru.hits / 20 === 0.4 && lru.faults / 20 === 0.6;
console.log(`${ratiosOk ? "PASS" : "FAIL"}  TC-ratio LRU: hit 0.40, fault 0.60`);