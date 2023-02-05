import { ErrorModel } from "../protocols";

export function notFoundError(message: string): ErrorModel {
 return {
  name: "NotFoundError",
  message,
 };
}
