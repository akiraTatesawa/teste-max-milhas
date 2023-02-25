/**
 * This interface represents an HTTP Error.
 *
 * Every error sent to the client-side must implement this interface.
 */
export interface HttpError {
  message: string;
  type: string;
}
