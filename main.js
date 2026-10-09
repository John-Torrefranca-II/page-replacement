// ui.js
const ALGOS = ["FIFO", "LRU", "OPT"];
const MAX_REFS = 40;
const MAX_FRAMES = 10;

document.getElementById("sim-form").addEventListener("submit", (e) => {
  e.preventDefault();
  run();
});
document.getElementById("random-btn").addEventListener("click", randomString);

function run() {
  const parsed = parseInput(
    document.getElementById("refs").value,
    document.getElementById("frames").value
  );
  if (parsed.error) return showError(parsed.error);
  showError("");

  const results = ALGOS.map((a) => simulate(parsed.refs, parsed.nFrames, a));
  renderSummary(results);
  renderHitMiss(parsed.refs, results);
  renderResults(parsed.refs, results);
}

// ---------- validation ----------
function parseInput(refText, frameText) {
  const tokens = refText.trim().split(/[\s,]+/).filter(Boolean);
  if (tokens.length === 0) return { error: "Enter a reference string." };
  if (!tokens.every((t) => /^\d+$/.test(t)))
    return { error: "Reference string must contain whole numbers (0 or more) only." };
  if (tokens.length > MAX_REFS)
    return { error: `Reference string is limited to ${MAX_REFS} pages.` };

  if (!/^\d+$/.test(frameText.trim()))
    return { error: "Number of frames must be a whole number." };
  const nFrames = Number(frameText.trim());
  if (nFrames < 1 || nFrames > MAX_FRAMES)
    return { error: `Frames must be between 1 and ${MAX_FRAMES}.` };

  return { refs: tokens.map(Number), nFrames };
}

function showError(msg) {
  document.getElementById("error").textContent = msg;
}

// ---------- rendering ----------
function renderSummary(results) {
  const best = Math.min(...results.map((r) => r.faults));
  const box = document.getElementById("summary");
  box.innerHTML = "";

  const h = document.createElement("h2");
  h.textContent = "Comparison";
  box.appendChild(h);

  const table = document.createElement("table");
  const head = table.insertRow();
  ["Algorithm", "References", "Hits", "Faults (misses)", "Hit ratio", "Fault ratio"]
    .forEach((t) => addCell(head, t, "label"));

  results.forEach((r) => {
    const total = r.hits + r.faults;
    const cls = r.faults === best ? "best" : "";
    const row = table.insertRow();
    addCell(row, r.algo + (cls ? " (fewest faults)" : ""), cls);
    addCell(row, total, cls);
    addCell(row, r.hits, cls);
    addCell(row, r.faults, cls);
    addCell(row, `${(r.hits / total).toFixed(2)} (${((r.hits / total) * 100).toFixed(1)}%)`, cls);
    addCell(row, `${(r.faults / total).toFixed(2)} (${((r.faults / total) * 100).toFixed(1)}%)`, cls);
  });

  box.appendChild(table);
}

function renderResults(refs, results) {
  const box = document.getElementById("results");
  box.innerHTML = "";
  results.forEach((r) => box.appendChild(buildTable(refs, r)));
}

function buildTable(refs, result) {
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const title = document.createElement("h3");
  title.textContent = `${result.algo}: ${result.faults} page faults`;
  wrap.appendChild(title);

  const table = document.createElement("table");
  const nFrames = result.steps[0].frames.length;

  // row 1: the reference string
  const head = table.insertRow();
  addCell(head, "Page", "label");
  result.steps.forEach((s) => addCell(head, s.page, s.fault ? "fault" : ""));

  // one row per frame slot
  for (let f = 0; f < nFrames; f++) {
    const row = table.insertRow();
    addCell(row, `Frame ${f + 1}`, "label");
    result.steps.forEach((s) => {
      const v = s.frames[f];
      addCell(row, v === null ? "" : v, s.fault ? "fault" : "");
    });
  }

  // last row: F = fault, H = hit (text, so it still reads without color)
  const last = table.insertRow();
  addCell(last, "Hit / Miss", "label");
  result.steps.forEach((s) => addCell(last, s.fault ? "F" : "H", s.fault ? "fault" : "hit"));

  wrap.appendChild(table);
  return wrap;
}

function addCell(row, text, cls) {
  const td = row.insertCell();
  td.textContent = text;
  if (cls) td.className = cls;
}

// ---------- random generator ----------
function randomString() {
  const len = 15 + Math.floor(Math.random() * 6); // 15-20
  const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 8));
  document.getElementById("refs").value = arr.join(",");
  run();
}

function renderHitMiss(refs, results) {
  const box = document.getElementById("hitmiss");
  box.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";

  const h = document.createElement("h2");
  h.textContent = "Hit / Miss table";
  wrap.appendChild(h);

  const table = document.createElement("table");

  const stepRow = table.insertRow();
  addCell(stepRow, "Step", "label");
  refs.forEach((_, i) => addCell(stepRow, i + 1, ""));

  const pageRow = table.insertRow();
  addCell(pageRow, "Page", "label");
  refs.forEach((p) => addCell(pageRow, p, ""));

  results.forEach((r) => {
    const row = table.insertRow();
    addCell(row, r.algo, "label");
    r.steps.forEach((s) => addCell(row, s.fault ? "Miss" : "Hit", s.fault ? "fault" : "hit"));
  });

  wrap.appendChild(table);
  box.appendChild(wrap);
}