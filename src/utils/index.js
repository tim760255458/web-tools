function* run() {
  console.log("run");
  const a = yield timer();
  console.log(a);
  yield 5;
}
function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
}

const gins = run();
gins.next().value.then((val) => {
  gins.next(val);
});
