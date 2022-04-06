import { MD5, SHA1, SHA256, SHA512, SHA3, RIPEMD160 } from 'crypto-js'
import { writeFileSync } from "fs"

const crypto = require('crypto').webcrypto

/**
 * modulo s vyřešenými zápornými hodnotami
 */
const betterMod = (n: number, d: number): number => {
  return ((n % d) + d) % d
}

const CHARS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const CHARS_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARS_DECIMAL = "0123456789";
const CHARS_SPECIAL = ` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

const CHARS = `${CHARS_LOWERCASE}${CHARS_UPPERCASE}${CHARS_DECIMAL}${CHARS_SPECIAL}`

const generateKey = (length = 15, chars = CHARS) => {
  const charsLen = chars.length;
  const arr = new Int32Array(length);
  crypto.getRandomValues(arr);
  const key = String.fromCharCode(
    ...Array.from(
      arr
        .map(x => betterMod(x, charsLen))
        .map(x => chars.charCodeAt(x))
    )
  )
  return key;
}

const hashFunctions = [
  { name: "MD5", fnc: MD5 },
  { name: "SHA1", fnc: SHA1 },
  { name: "SHA256", fnc: SHA256 },
  { name: "SHA512", fnc: SHA512 },
  { name: "SHA3", fnc: SHA3 },
  { name: "RIPEMD160", fnc: RIPEMD160 },
];

const KEYS_LEN = 10_000;
const MAX_TIME_MEASUREMENT = 60_000;

const keysByLength = [10, 25, 50, 75, 100, 250, 500, 750, 1_000, 2_500, 5_000, 7_500, 10_000]
  .map(length => {
    console.log(`generating keys with length: ${length}`);
    const keys = new Array(KEYS_LEN).fill("").map(() => generateKey(length));
    return { length, keys };
  })
console.log(`key generation done!\n`);

const res: { name: string, length: number, hashS: number }[] = [];


console.log([
  "name".padStart(10, " "),
  "length".padStart(6, " "),
  "time".padStart(6, " "),
].join(", "))

hashFunctions.forEach(({ name, fnc }) => {
  keysByLength.forEach(({ length, keys }) => {
    let success = keys.length;
    const t0 = Date.now();
    for (let i = 0; i < keys.length; i++) {
      if ((i % 100 === 0) && ((Date.now() - t0) > MAX_TIME_MEASUREMENT)) {
        success = i;
        break;
      }
      const key = keys[i];
      const _hash = fnc(key).toString();
    }
    const t1 = Date.now();
    const hashS = Math.floor(1000 * success / (t1 - t0));
    res.push({ name, length, hashS });

    console.log([
      name.padStart(10, " "),
      length.toString().padStart(6, " "),
      hashS.toString().padStart(6, " "),
    ].join(", "))
  })
})

const tableColumns = [
  ["Function", ...hashFunctions.map(({ name }) => name)],
  ...keysByLength.map(({ length }) =>
    [length.toString(), ...hashFunctions
      .map(({ name }) => (res.find(x => x.name === name && x.length === length)?.hashS ?? -1))
      .map(x => x.toString())
    ]
  )
].map(column => {
  const maxLen = Math.max(...column.map(x => x.length));
  return column.map(x => x.padStart(maxLen, " "))
})
  ;

const rows = new Array(tableColumns[0].length).fill(0).map((_, i) => i)
  .map(ri => tableColumns.map(x => x[ri]));

const table = rows.map(row => row.join(", ")).join("\n");

console.log("\n\n");
console.log(table);

const csv = [[
  "name".padStart(10, " "),
  "length".padStart(6, " "),
  "hash/s".padStart(6, " "),
].join(", "),
...res
  .map(({ length, name, hashS }) => [
    name.padStart(10, " "),
    length.toString().padStart(6, " "),
    hashS.toString().padStart(6, " "),
  ].join(", "))].join("\n");

writeFileSync("./result.csv", csv)
writeFileSync("./result-pivot.csv", table)
