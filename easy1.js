// 🟢 Very Small — Problem 1 consuming promises)
// Constraints
// Second call must start after first finishes.
// Use then()

// Tests
// Output must appear after ~2 seconds.

// Focus
// Serialization

// Task
// You are given a function readNumber() that returns a Promise resolving to a number after 1 second.
// Call it twice serially.
// Print the sum after both complete.

const readNumber = (num) =>
  new Promise((resolve) => setTimeout(() => resolve(num), 1000));

readNumber(5)
  .then((a) => readNumber(3).then((b) => a + b))
  .then((x) => console.log(x));

// 🟢 Very Small — Problem 2

// Task
// You are given 3 functions:
// fetchA(), fetchB(), fetchC() → each returns a Promise resolving to a number after random delay.
// Run all in parallel.
// Print the maximum value.

// Constraints
// No promise should wait for another.
// Use Promise.all.

// Focus
// Parallelization
// Collecting results

const randomDelayNum = (num, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(num), delay));

const fetchA = (num) => randomDelayNum(num, num * 1000);
const fetchB = (num) => randomDelayNum(num, num * 1000);
const fetchC = (num) => randomDelayNum(num, num * 1000);

Promise.all([fetchA(1), fetchB(2), fetchC(3)])
  .then((nums) => Math.max(...nums))
  .then((max) => console.log(max));

// 🟢 Small — Problem 3

// Task
// Print:
// "start"
// After reading a file, print its line count
// Print "done"

// Constraints
// "done" must print only after file is read
// "start" must print immediately

// Focus
// Understanding execution order
// Where promises pause execution

const toLines = (content) => content.trimEnd().split("\n");
const lines = (content) => content.length;
const display = (value, msg = "result :") => {
  console.log(msg, value);
  return value;
};

const fileLineCount = (file) => {
  console.log("start");
  return Deno.readTextFile(file)
    .then((content) => display(content, "done"))
    .then(toLines)
    .then(lines)
    .then((count) => display(count, "count"));
};

fileLineCount("./f.txt");

// 🟡 Medium — Problem 4

// Task
// You are given a file files.txt
// a.txt
// b.txt
// c.txt
// Each file contains numbers (one per line).

// Goal
// Read files.txt
// Read all listed files in parallel

// Output:
// TOTAL_LINES,TOTAL_SUM

// Constraints
// File list must be read first
// Number files must be read in parallel
// Avoid unnecessary serialization

// Focus

// Dependency-based flow
// Promise.all after a required step
const toNumbers = (lines) => lines.map(Number);
const readFile = (file) => Deno.readTextFile(file);

const getRequiredInfo = (data) => {
  const numbers = data.flat();
  const total_sum = numbers.reduce((sum, num) => sum + num);
  return { total_sum, total_lines: numbers.length };
};

const files = readFile("./files.txt")
  .then(toLines)
  .then((line) =>
    Promise.all(
      line.map((file) =>
        readFile(file).then(toLines).then(toNumbers).then(getRequiredInfo)
      ),
    )
  );

files.then(console.log);
