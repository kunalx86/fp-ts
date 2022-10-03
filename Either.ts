type Left = {
  error: Error;
}

type Right<T> = {
  value: T;
}

export type _Either<T> = Left | Right<T>

class Either<T> {
  private _ref: _Either<T>;

  private constructor(ref: _Either<T>) {
    this._ref = ref
  }

  static makeLeft<T>(error: Error) {
    return new Either<T>({ error })
  }

  static makeRight<T>(value: T) {
    return new Either<T>({ value })
  }

  map<U>(f: (t: T) => U | never): Either<U> {
    if ("error" in this._ref) {
      return Either.makeLeft<U>(this._ref.error)
    } else {
      const t = this._ref.value
      return Either.from(() => f(t))
    }
  }

  static from<T>(f: () => T | never): Either<T> {
    try {
      const value = f();
      return Either.makeRight<T>(value)
    } catch (error) {
      if (error instanceof Error)
        return Either.makeLeft<T>(error)
      else
        throw new Error(`Not recognized error`)
    }
  }

  match({ left, right, alas }: {
    left: (e: Error) => void,
    right: (t: T) => void,
    alas?: () => void
  }) {
    if ("error" in this._ref)
      left(this._ref.error)
    else
      right(this._ref.value)
    alas && alas();
  }
}

export default Either;

