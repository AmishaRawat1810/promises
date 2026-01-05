const result = [];

async function executeTask(taskName) {
  console.log(taskName, " started");
  const content = await Deno.readTextFile(`./${taskName}.txt`);
  const sum = content.split("\n")
    .reduce((n1, n2) => parseInt(n1) + parseInt(n2));
  console.log(taskName, " finished");
  return sum;
}

const executeLine = (line) => {
  const task = line.split(",").map((l) => l.trim());
  return Promise.all(task.map(executeTask));
};

async function executeRecipe(reciepeFile) {
  console.log("reciepe started");
  const content = await Deno.readTextFile(reciepeFile);
  const lines = content.split('\n');
  for (const line of lines) {
    console.log("please wait...");
    const t = await executeLine(line);
    result.push(t);
  }
  console.log("Receipe Completed");
}

await executeRecipe('reciepes.txt');