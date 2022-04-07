
export const apiLog = async (): Promise<string[]> => {
  const res = await fetch("/api/log", { method: "POST" });
  return await res.json()
}

export const apiInit = async (clientId: string, n: number, fn: string): Promise<{initRes: boolean} | undefined> => {
  const res = await fetch("/api/init", {
    method: "POST",
    body: JSON.stringify({ clientId, n, fn }),
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  return res.json();
}

export const apiGetLastN = async (clientId: string): Promise<{lastN: number}> => {
  const res = await fetch("/api/get-last-n", {
    method: "POST",
    body: JSON.stringify({clientId}),
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  return res.json();
}

export const apiPushLoad = async (clientId: string, fn1: string, note?: string): Promise<string[] | undefined> => {
  const res = await fetch("/api/push-load", {
    method: "POST",
    body: JSON.stringify({ clientId, fn1, note }),
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  return res.json();
}
