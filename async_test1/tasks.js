function createTask(name, delay, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) reject(new Error(name + " failed"));
        else resolve(name + " done");
      }, delay);
    });
}

const tasks = [
  createTask("A", 300),
  createTask("B", 100, true),
  createTask("C", 200),
];

const runInSerial = async (errors, results, tasks) => {
  for (const task of tasks) {
    try {
      const result = await task();
      results.push(result);
    } catch (e) {
      errors.push(e.message);
    }
  }
  return { results, errors };
};

const runInParallel = async (results, errors, tasks) => {
  const tasksPromises = tasks.map((task) =>
    task()
      .then((val) => ({ value: val, threwError: false }))
      .catch((error) => ({ value: error.message, threwError: true }))
  );
  const tasksResolved = await Promise.all(tasksPromises);
  tasksResolved.forEach((task) => {
    if (task.threwError) {
      errors.push(task.value);
    } else {
      results.push(task.value);
    }
  });
  return { results, errors };
};

const runTasks =  async (tasks, mode) => {
  if (mode === "serial")
    return await runInSerial([], [], tasks);
  return await runInParallel([],[],tasks);
}

await runTasks(tasks,"serial");
await runTasks(tasks,"parallel");