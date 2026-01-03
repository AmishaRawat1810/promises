const p = new Promise((resolve, reject) => {
  const data = [];
  Deno.readTextFile("./f.txt").then((filesData) => {
    const files = filesData.split("\n").filter((each) => each !== "");
    console.log(files);

    files.forEach((file) => {
      Deno.readTextFile(file).then((eachFileData) => {
        data.push(eachFileData);
      });
    });
  });
  Promise.all(data).then((data) => resolve(data));
});

const k = p.then((data) => {
  console.log("data:", { data });
});
