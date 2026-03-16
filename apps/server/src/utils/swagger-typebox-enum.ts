import { Type } from "@sinclair/typebox";

export const StringEnum = <T extends string[]>(items: [...T]) =>
  Type.Unsafe<T[number]>({ type: "string", enum: items });