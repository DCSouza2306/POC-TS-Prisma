import { ErrorModel } from "../protocols";

export function conflictError(message: string): ErrorModel {
 return {
  name: "ConflictError",
  message,
 };
}
