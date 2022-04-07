import { Router } from "express";
import { NoteService } from "../logic/NoteService";

const router = Router();

const noteService = new NoteService();
const log: string[] = [];

router.post("/init", (req, res) => {
  const {
    clientId, n, fn
  } = req.body;

  const initRes = noteService.init(clientId, n, fn);

  log.push(
    `init ${initRes ? "success" : "failed"} for ${clientId} with n: ${n} fn: ${fn}`
  );
  res.json({ initRes });
})

router.post("/get-last-n", (req, res) => {
  const {
    clientId
  } = req.body;
  
  const lastN = noteService.getLastN(clientId);
  log.push(`client last-n ${clientId} ${lastN === -2 ? "client not exist" : `last N:${lastN}`}`)
  res.json({ lastN });
})

router.post("/push-load", (req, res) => {
  const {
    clientId, fn1
  } = req.body;
  const note = req.body?.note;

  const notes = noteService.pushAndLoadNotes(clientId, fn1, note);

  if (!notes)
    log.push(`cliend failed authentication ${clientId} with fn-1: ${fn1}`)
  else
    log.push(`cliend authenticated ${clientId} with fn-1: ${fn1}`)

  res.json(notes);
})

router.post("/log", (req, res) => {
  res.json(log);
});


export default router;

