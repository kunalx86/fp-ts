import Maybe from "./Maybe";

const maybeUndefined = <T>(x: T) => {
  if (Math.random() < 10) return x;
  return undefined;
}

const maybeNull = <T>(x: T) => {
  if (Math.random() < 10) return x;
  return null;
}

function main() {
  console.log('---MAYBE---')
  Maybe.from(4)
    .fmap(x => Maybe.from(x + 1))
    .fmap(x => Maybe.from(maybeUndefined(x)))
    .fmap(x => Maybe.from(maybeNull(x)))
    .fmap(x => Maybe.from(x + 2))
    .map(x => x)
    .match({
      just: (x) => console.log(`Just ${x}`),
      nothing: () => console.log('Nothing')
    });
}

main();
