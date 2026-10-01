import type { IncomingMessage, ServerResponse } from "http";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type Res = ServerResponse;
export type Req = IncomingMessage & {
  method: Method;
};

export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  nationality: string;
}
