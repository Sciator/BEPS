import { StringFn } from "../types";
import { LoginService } from "./LoginService";

export class NoteService {
  private loginService: LoginService;
  private notes: Map<string, string[]> = new Map();

  public init(clientId: string, n: number, fn: string) {
    const initRes = this.loginService.init(clientId, n, fn);

    return initRes;
  }

  public getLastN(clientId: string) {
    const lastN = this.loginService.getLastN(clientId);
    return lastN;
  }

  public pushAndLoadNotes(clientId: string, fn1: string, note?: string): string[] | undefined {
    const authenticated = this.loginService.authenticate(clientId, fn1);
    if (!authenticated) {
      return;
    }

    if (!this.notes.has(clientId))
      this.notes.set(clientId, []);

    const notes = this.notes.get(clientId)!;

    if (note) notes.push(note);
    return notes;
  }

  constructor(cryptoFn?: StringFn) {
    this.loginService = new LoginService(cryptoFn);
  }
}
