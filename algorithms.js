function simulate(refs, nFrames, algo) {
  const slots = Array(nFrames).fill(null);
  const loadedAt = Array(nFrames).fill(-1); // for FIFO
  const lastUsed = Array(nFrames).fill(-1); // for LRU
  const steps = [];
  let faults = 0;

  refs.forEach((page, i) => {
    const hitIdx = slots.indexOf(page);
    let fault = false;
    let evicted = null;

    if (hitIdx !== -1) {
      lastUsed[hitIdx] = i; // hit: only LRU cares
    } else {
      fault = true;
      faults++;

      let target = slots.indexOf(null); // use an empty slot first
      if (target === -1) {
        target = pickVictim(algo, slots, loadedAt, lastUsed, refs, i);
        evicted = slots[target];
      }
      slots[target] = page;
      loadedAt[target] = i;
      lastUsed[target] = i;
    }

    steps.push({ page, frames: [...slots], fault, evicted });
  });

  return { algo, faults, hits: refs.length - faults, steps };
}

function pickVictim(algo, slots, loadedAt, lastUsed, refs, i) {
  if (algo === "FIFO") return indexOfMin(loadedAt);
  if (algo === "LRU") return indexOfMin(lastUsed);

  // OPT: farthest next use wins
  let victim = 0;
  let farthest = -1;
  slots.forEach((p, idx) => {
    let next = refs.indexOf(p, i + 1);
    if (next === -1) next = Infinity;
    if (next > farthest) {
      farthest = next;
      victim = idx;
    }
  });
  return victim;
}

function indexOfMin(arr) {
  let best = 0;
  for (let k = 1; k < arr.length; k++) {
    if (arr[k] < arr[best]) best = k;
  }
  return best;
}

if (typeof module !== "undefined") module.exports = { simulate };