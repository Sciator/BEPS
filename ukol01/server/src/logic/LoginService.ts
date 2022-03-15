import { MD5 } from "crypto-js"
import { StringFn } from "../types";

type UserAuthentication = {
  n: number,
  hash: string,
}

export class LoginService {
  private users: Map<string, UserAuthentication> = new Map();
  private cryptoFn: StringFn;

  public init(clientId: string, n: number, fn: string) {
    if (this.users.has(clientId))
      return false;
    this.users.set(clientId, { n, hash: fn });
    return true;
  }

  public getLastN(clientId: string) {
    return (this.users.get(clientId)?.n ?? -1) - 1;
  }

  public authenticate(clientId: string, fn1: string) {
    const authentication = this.users.get(clientId);
    if (!authentication) return;
    const res = this.cryptoFn(fn1);
    if (authentication.hash === res) {
      authentication.hash = fn1;
      authentication.n -= 1;
      return true;
    }
    return false;
  }

  constructor(cryptoFn?: StringFn) {
    if (cryptoFn)
      this.cryptoFn = cryptoFn;
    else
      this.cryptoFn = (x) => MD5(x).toString();
  }
}
