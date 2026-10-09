# Page Replacement Simulator

**Topic code and Topic:** B2 - Page Replacement Algorithms (FIFO, LRU, Optimal)
**Course:** BSIT , National Teachers College
**Section:** 2.11 
**Instructor:** Sir Joemel Atiga
**Live demo:** https://john-torrefranca-ii.github.io/page-replacement/
**Repository:** https://github.com/John-Torrefranca-II/page-replacement

## OS Concept

**Memory management: page replacement.**

RAM has a limited number of frames, but a program can request more pages than will fit. When a requested page is not in a frame (a page fault) and all frames are full, the operating system must remove one page to make room. A page replacement algorithm decides which page to remove. Fewer page faults means better performance.

This project simulates three algorithms and compares the number of page faults each one causes on the same input.

| Algorithm | Rule |
|---|---|
| FIFO (First In, First Out) | Remove the page that has been in memory the longest |
| LRU (Least Recently Used) | Remove the page that has not been used for the longest time |
| OPT (Optimal) | Remove the page that will not be needed for the longest time in the future |

OPT needs to know future requests, so a real OS cannot use it. It is included as the best-case benchmark for comparing the other two.

## Group Members

| Member | Role | Main contribution |
| [Torrefranca, John Merlo II] | e.g., Algorithm lead, algorithm.js Test.js, Documentation |
| [Guevarra, John Melvin] | html, ui.js, style.css |
| [Tanggote, Alyzza] | Testing and documentation |
| [Añete, Nicole Angela] | Testing and documentation |

## Programming Language and Version

| Item | Details |
|---|---|
| Language | JavaScript (ES6 or later) |
| Markup and styling | HTML5 and CSS3 |
| Editor | Visual Studio Code [version] |
| Browser tested | [browser name and version] |

No frameworks or external libraries are used.

## Requirements and Setup

**Requirements**

- A modern web browser (Chrome, Edge, Firefox or Brave)
- Nothing else is required to run the program

**Optional tools**

- Visual Studio Code with the Live Server extension, for editing with auto-reload
- Node.js (LTS), only to run `tests.js` in the terminal with `node tests.js`
- Git, to clone the repository

**Setup**

1. Download the repository as a ZIP from GitHub (Code, then Download ZIP) and extract it, or clone it:
```
   git clone https://github.com/John-Torrefranca-II/page-replacement.git
```
2. Keep all files in the same folder, because `index.html` loads `style.css`, `algorithms.js` and `ui.js`.

No installation, server or internet connection is needed to run the program.

## How to Run the Program

**Option 1: Online.** Open the live demo link above.

**Option 2: Locally.** Open the project folder and double-click `index.html`. It opens in your default browser.

**Option 3: VS Code.** Open the project folder in VS Code, right-click `index.html`, and choose Open with Live Server.

**To run the tests,** open `test.html` the same way. Every line should show PASS.

## How to Use the Program

1. Type a **reference string** in the first box. Use whole numbers separated by commas or spaces.
2. Type the **number of frames** in the second box.
3. Click **Run simulation**. The Random string button fills the first box with a random string and runs it immediately.
4. Read the **Comparison** table at the top. For each algorithm it shows the number of references, hits, faults (misses), hit ratio and fault ratio, and it marks the algorithm with the fewest faults.
5. Below it, the **Hit / Miss table** lists Hit or Miss for every step, for all three algorithms side by side.
6. Scroll down to see one frame table for each algorithm:
   - The top row is the reference string.
   - Each Frame row shows what is in that frame after every step.
   - The Result row shows **F** for a page fault and **H** for a hit.
   - On a page fault, the whole column is shaded red. In the Result row, H cells are shaded green.

**Input rules**

| Input | Allowed |
|---|---|
| Reference string | Whole numbers, 0 or higher, separated by commas or spaces. Maximum 40 pages. |
| Number of frames | A whole number from 1 to 10 |

**Error messages**

| Problem | Message shown |
|---|---|
| Empty reference string | Enter a reference string. |
| Letters, negative numbers or decimals in the reference string | Reference string must contain whole numbers (0 or more) only. |
| More than 40 pages | Reference string is limited to 40 pages. |
| Frames is empty, a letter, negative or a decimal | Number of frames must be a whole number. |
| Frames is 0 or more than 10 | Frames must be between 1 and 10. |

When an error is shown, the simulation does not run.

## Sample Input

```
Reference string: 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1
Number of frames: 3
```

## Sample Output

## Sample Output

**Comparison table**

| Algorithm | References | Hits | Faults (misses) | Hit ratio | Fault ratio |
|---|---|---|---|---|---|
| FIFO | 20 | 5 | 15 | 0.25 (25.0%) | 0.75 (75.0%) |
| LRU | 20 | 8 | 12 | 0.40 (40.0%) | 0.60 (60.0%) |
| OPT (fewest faults) | 20 | 11 | 9 | 0.55 (55.0%) | 0.45 (45.0%) |

For every algorithm, hit ratio plus fault ratio equals 1.

**Hit / Miss table** (first 8 steps shown)

```
Step   1    2    3    4    5    6    7    8
Page   7    0    1    2    0    3    0    4
FIFO   Miss Miss Miss Miss Hit  Miss Miss Miss
LRU    Miss Miss Miss Miss Hit  Miss Hit  Miss
OPT    Miss Miss Miss Miss Hit  Miss Hit  Miss
```

**FIFO frame table** (blank means the frame is empty)

```
Page     7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
Frame 1  7 7 7 2 2 2 2 4 4 4 0 0 0 0 0 0 0 7 7 7
Frame 2    0 0 0 0 3 3 3 2 2 2 2 2 1 1 1 1 1 0 0
Frame 3      1 1 1 1 0 0 0 3 3 3 3 3 2 2 2 2 2 1
Result   F F F F H F F F F F F H H F F H H F F F
```

The LRU and OPT frame tables appear below it on the page in the same format.

**Invalid input example**

```
Reference string: 7,a,1
Result: Reference string must contain whole numbers (0 or more) only.
```

**Invalid input example**

```
Reference string: 7,a,1
Result: Reference string must contain whole numbers (0 or more) only.
```

## How It Works

For each page in the reference string, from left to right:

1. If the page is already in a frame, it is a hit and nothing changes.
2. If it is not in a frame and a frame is empty, the page is loaded into the first empty frame (page fault).
3. If it is not in a frame and all frames are full, the algorithm chooses a victim page and the new page takes its frame (page fault).

The algorithms only differ in how the victim is chosen in step 3.

**Tie-breaking rules**

- Empty frames are always filled before any page is removed.
- FIFO removes the page that was loaded earliest.
- LRU removes the page that was used least recently. A hit counts as a use.
- OPT removes the page whose next use is farthest away, or a page that is never used again. If several pages tie, it removes the one in the lowest-numbered frame.

## Project Structure

```
page-replacement/
├── index.html      Page layout and input form
├── style.css       Styling
├── algorithms.js   FIFO, LRU and OPT logic (no page code)
├── ui.js           Input validation and table drawing
├── tests.js        Test cases checked against hand-solved answers
├── test.html       Runs tests.js in the browser
└── README.md
```

## Testing

Test results are recorded in the documentation. Summary of the main cases:

| ID | Input | Expected | Actual | Result |
|---|---|---|---|---|
| TC-01 | Textbook string, 3 frames | FIFO 15, LRU 12, OPT 9 | [fill in] | [Pass/Fail] |
| TC-02 | `1,2,3,4,1,2,5,1,2,3,4,5`, 3 frames | FIFO 9 | [fill in] | [Pass/Fail] |
| TC-03 | Same string, 4 frames | FIFO 10 | [fill in] | [Pass/Fail] |
| TC-04 | `1,1,2,2,1`, 1 frame | 3 faults for all three | [fill in] | [Pass/Fail] |
| TC-05 | Empty reference string | Error message, no crash | [fill in] | [Pass/Fail] |
| TC-06 | `a,b,c` | Error message | [fill in] | [Pass/Fail] |
| TC-07 | Frames = 0 | Error message | [fill in] | [Pass/Fail] |
| TC-08 | Textbook string, 3 frames, LRU ratios | Hit ratio 0.40, fault ratio 0.60 | [fill in] | [Pass/Fail] |

## Limitations

- Reference strings are limited to 40 pages and 1 to 10 frames.
- Pages are whole numbers only, not names like A, B, C.
- Results are shown as tables, with no step-by-step animation.
- Only FIFO, LRU and OPT are implemented.
- This is a simulation and does not manage real memory.

## References

- Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating system concepts* (10th ed.). Wiley.
- Tanenbaum, A. S., & Bos, H. (2015). *Modern operating systems* (4th ed.). Pearson.
- Arpaci-Dusseau, R. H., & Arpaci-Dusseau, A. C. (2018). *Operating systems: Three easy pieces*. https://pages.cs.wisc.edu/~remzi/OSTEP/