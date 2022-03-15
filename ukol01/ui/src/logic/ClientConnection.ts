import { MD5 } from "crypto-js";
import { apiGetLastN, apiInit, apiPushLoad } from "../api";
import { applyMultipleTimes } from "./functions";

const applyMD5 = applyMultipleTimes.bind(
  undefined, (x: string) => MD5(x).toString());

export class ClientConnection {
  private _logged = false;
  private _clientId;
  private _notes: string[] = [];
  private _calculateHash: (n: number)=>string;

  public get logged() {
    return this._logged;
  }

  public get notes() {
    return this._notes;
  }


  public async initLoginSend(note?: string) {
    const {lastN} = await apiGetLastN(this._clientId);

    if (lastN === -2) {
      const n = 1000;
      const hash = this._calculateHash(n);
      const res = await apiInit(this._clientId, n, hash);
      if (res?.initRes)
        this._logged = true;
      
    } else {
      const hash = this._calculateHash(lastN);
      const notes = await apiPushLoad(this._clientId, hash, note)
      this._notes = notes ?? [];
    }
  }

  constructor(clientId: string, seed: string) {
    this._clientId = clientId;
    this._calculateHash = applyMD5.bind(undefined, seed);
  }
}

