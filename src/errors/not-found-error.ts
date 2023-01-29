import { ErrorModel } from "../protocols.js";

export function notFoundError(message: string): ErrorModel {
 return {
  name: "NotFoundError",
  message,
 };
}
