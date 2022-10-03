import Either, { _Either } from "./Either"

type _Task<T> = Promise<T>

class Task<T> {
  private _ref: Either<_Task<T>>;

  constructor(_ref: Either<_Task<T>>) {
    this._ref = _ref;
  }

  static from<T>(f: () => _Task<T>) {
    return new Task<T>(Either.from<_Task<T>>(f))
  }

  match({ left, right, alas }: {
    left: <U>(t: T) => void | Task<U>,
    right: (e: Error) => void,
    alas: () => void
  }) {

  }
}

export default Task;