class MyPromise {
  constructor(executor) {
    this.executor = executor;

    this.resolve = function (value) {
      this.isResolved = true;
      this.resolvedValue = value;
      if (this.onResolve) {
        this.onResolve(value);
      }
    };

    this.reject = function () {};
    this.executor &&
      this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  then(onResolve) {
    this.onResolve = onResolve;
    if (this.isResolved) {
      this.onResolve(this.resolvedValue);
    }
    return new MyPromise();
  }
}
