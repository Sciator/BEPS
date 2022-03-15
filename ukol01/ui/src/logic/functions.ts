
export const applyMultipleTimes = (fnc: (input: string) => string, input: string, times: number) => {
  let res = input;
  for (let i = 0; i < times; i++) {
    res = fnc(res);
  }
  return res;
}
