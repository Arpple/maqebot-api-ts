class MyError {}
class ExError extends MyError {}

const err = new MyError()

console.log(err instanceof MyError)
console.log(err instanceof ExError)
