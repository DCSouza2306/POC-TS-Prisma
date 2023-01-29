import { ErrorModel } from "../protocols.js";

export function conflictError(message: string): ErrorModel {
 return {
  name: "ConflictError",
  message,
 };
}
