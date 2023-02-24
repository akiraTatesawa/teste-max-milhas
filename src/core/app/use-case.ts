/**
 * An Use Case abstraction. Every Use Case in this application must extend this class.
 *
 * Each Use Case must implement the abstract `execute` method, which is the only public method
 * the use case must have.
 * @class
 */
export abstract class UseCase<Input, Output> {
  public abstract execute(input: Input): Promise<Output>;
}
