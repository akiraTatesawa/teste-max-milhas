/**
 * This abstract class represents the model of an Application.
 *
 * Every application class in this app must extend this class and implement
 * its abstracts methods.
 * @class
 */
export abstract class Application {
  protected abstract configMiddlewares(): void;
  public abstract init(): Promise<void>;
}
