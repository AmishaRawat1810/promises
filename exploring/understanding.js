const onSuccess = (message, value) => {
  console.log(message);
  return () => {
    console.log("inside executor of", message);
    return value;
  };
};

const onFailure = (message, value) => {
  console.log("FAILED", message);
  return () => {
    console.log("inside executor of", message);
    return value;
  };
};

Promise.reject(5)
  .then(onSuccess("then 1", 2))
  .then(onSuccess("then 2", 100))
  .then(onSuccess("then 3", 400))
  .catch(onFailure("catch 1", -1));
