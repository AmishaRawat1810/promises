const result = [];

async function executeTask(taskName) {
  console.log(taskName, " started");
  const content = await Deno.readTextFile(`./manifest/${taskName}.txt`);
  const sum = content.split("\n")
    .reduce((n1, n2) => parseInt(n1) + parseInt(n2));
  console.log(taskName, " finished");
  return sum;
}

const executeLine = (line, fn) => {
  const task = line.split(",").map((l) => l.trim());
  return Promise.all(task.map(fn));
};

async function executeEachReciepe(reciepeName) {
  const content = await Deno.readTextFile(`./manifest/${reciepeName}.txt`);
  const lines = content.split("\n").map((l) => l.trim());
  for (const line of lines) {
    const value = await executeLine(line, executeTask);
    result.push(value);
  }
}

async function executeRecipe(file) {
  console.log("Task started");
  const content = await Deno.readTextFile(file);
  const lines = content.split("\n");
  for (const line of lines) {
    console.log("please wait...");
    await executeLine(line, executeEachReciepe);
  }
  console.log("Reciepe Completed");
}

await executeRecipe("./manifest/tasks.txt");
