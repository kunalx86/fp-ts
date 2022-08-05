type Nothing = undefined | null;

class Maybe<T> {
  private _ref: T | Nothing;

  constructor(ref: T | Nothing) {
    this._ref = ref;
  }
  
  static just<T>(ref: T) {
    return new Maybe<T>(ref);
  }

  static nothing<T>() {
    return new Maybe<T>(undefined);
  }

  static from<T>(ref: T | Nothing): Maybe<T> {
    return ref? Maybe.just<T>(ref) : Maybe.nothing<T>();
  }

  value() {
    return this._ref
  }

  map<U>(f: (t: T) => U): Maybe<U> {
    if (this._ref === null || this._ref === undefined) return Maybe.nothing();
    return Maybe.just(f(this._ref));
  }

  fmap<U>(f: (t: T) => Maybe<U>) {
    if (this._ref === null || this._ref === undefined) return Maybe.nothing();
    return f(this._ref);
  }

  match<U>({ just, nothing }: {
    just: (t: T) => U,
    nothing: () => U
  }) {
    if (this._ref) return just(this._ref);
    return nothing();
  }
}

export default Maybe;