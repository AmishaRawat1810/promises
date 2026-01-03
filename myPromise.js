class MyPromise {
  constructor(executor) {
    this.executor = executor;
    this.isResolved = false;

    this.resolve = (value) => {
      this.isResolved = true;
      this.resolvedValue = value;
      if (this.callback) {
        this.callback(value);
      }
    };

    this.executor && this.executor(this.resolve.bind(this));
  }

  then(callback) {
    this.callback = callback;
    if (this.callback) {
      this.value = this.callback(this.resolvedValue);
      this.resolvedValue = this.value;
    } else {
      //
    }
  }
}

const p1 = new MyPromise((resolve) => resolve(100)).then((x) => console.log(x));
