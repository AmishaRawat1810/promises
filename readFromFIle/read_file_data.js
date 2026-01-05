const step = (value, time) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("i am inside", value); //1
      res(value);
    }, time);
  });
};

const p1 = new Promise((resolve, _reject) => {
  const p = Deno.readTextFile("./demo.txt"); // it is in macro task queue

  const content = p.then((para) => {
    console.log("first promise ka pehla then"); //2
    step(para, 0);
    return 2;
  });

  content.then((para) => {
    console.log("first promise ka dusra then"); //3
    step(para, 0);
  });

  console.log(content === p, "pehle files read kari", content, p); //4
  resolve(5);
}).then((x) => x);

console.log("uske baad yeh line kheech rha h", "-".repeat(30)); // 5

const p2 = new Promise((_resolve, _reject) =>
  Deno.readTextFile("./demo.txt") // task queue
    .then((para) => {
      console.log("second promise ka pehla then"); //6
      return para.split("\n");
    })
    .then((x) => {
      // _resolve("vismaya");
      return "vismaya";
    }).then((z) => console.log("last", z)) //7
);

setTimeout(() => console.log(p1, p2), 0); //8
