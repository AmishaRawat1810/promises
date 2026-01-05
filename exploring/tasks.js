const tasks = (desc, time) => {
  return new Promise((resolve) => {
    const start = Date.now();
    setTimeout(() => {
      const end = Date.now();
      resolve({ desc, start, end, duration: end - start });
    }, time);
  }).then((x) => {
    console.log(x);
    return x;
  });
};

const tasksToRunIn = ["task1", "task2", "task3"];

Promise.all(tasksToRunIn.map((x) => TASKS[x]()));

Promise.all(
  tasksToRunIn.reduce((p, t) => p.then((_) => TASKS[t]()), Promise.resolve([])),
);

tasksToRunIn.reduce((p, t) => p.then((_) => TASKS[t]()), Promise.resolve());

Promise.all(
  tasksToRunIn.reduce((p, t) => p.then((_) => TASKS[t]()), Promise.resolve()),
).catch((err) => console.log("done"));
