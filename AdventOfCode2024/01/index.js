import fs from "node:fs";

// Part 1
const left = [];
const right = [];

try {
  const data = fs.readFileSync("./data.txt", "utf8");
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("   ");
    left.push(+line[0]);
    right.push(+line[1]);
  }
} catch (err) {
  console.error(err);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let res = 0;
for (let i = 0; i < left.length; i++) {
  let leftN = left[i];
  let rightN = right[i];
  res += Math.abs(leftN - rightN);
}

// Part 2
let simScore = 0;
for (let i = 0; i < left.length; i++) {
  let count = 0;
  let leftN = left[i];
  for (let j = 0; j < right.length; j++) {
    if (leftN === right[j]) {
      count++;
    }
  }
  simScore += leftN * count;
}

// OG
// Part 1: 2430334
// Part 2: 28786472
// Time: 0.010763, 0.011122, 0.010981

//New
// Part 1: 2430334
// Part 2: 28786472
// Time: 0.005022, 0.005239, 0.004995
