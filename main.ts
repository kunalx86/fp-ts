import Either from "./Either";
import Maybe from "./Maybe";

const maybeUndefined = <T>(x: T) => {
  if (Math.random() < 10) return x;
  return undefined;
}

const maybeNull = <T>(x: T) => {
  if (Math.random() < 10) return x;
  return null;
}

const throwsMaybe = (arg: number, status: number) => {
  if (Math.random() < arg) return `${arg}`
  else throw new CustomError("Something went wrong", status)
}

class CustomError extends Error {
  readonly status: number;
  constructor(msg: string, status: number = 500) {
    super(msg);
    this.status = status;
  }
}

function main() {
  console.log('---MAYBE---')
  Maybe
    .from(4)
    .fmap(x => Maybe.from(x + 1))
    .fmap(x => Maybe.from(maybeUndefined(x)))
    .fmap(x => Maybe.from(maybeNull(x)))
    .fmap(x => Maybe.from(x + 2))
    .map(x => x)
    .match({
      just: (x) => console.log(`Just ${x}`),
      nothing: () => console.log('Nothing')
    });

  console.log('---EITHER---')
  Either
    .from(() => throwsMaybe(3, 1))
    .map((t) => throwsMaybe(parseInt(t) - 1, 2))
    .match({
      left: (e) => {
        if (e instanceof CustomError) {
          console.error(`CustomError: ${e.status}`)
        } else {
          console.error(e)
        }
      },
      right: (t) => console.log(`Data: ${t}`),
      alas: () => console.log("I will be executed regardless")
    })
}

main();