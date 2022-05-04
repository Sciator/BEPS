Výpočet proveden na grafické kartě **RTX3060ti**.

Pro výpočet byla použita znalost 
```
Velká i malá písmena + čísla
délka 4 až 8 znaků
```
která v podobě hashcat argumentů vypadala
```
-i --increment-min 4 -w 4 -1 ?l?u?d ?1?1?1?1?1?1?1?1
```

Nalezené vzory pro MD5. Hledání probíhalo cca 2h
```
6f1ed002ab5595859014ebf0951522d9:blah
827ccb0eea8a706c4c34a16891f84e7b:12345
8705056ad307ebf0c2970fe3c6d21603:65432
8b1a9953c4611296a827abf8c47804d7:Hello
9f3a08745c23449a53fc05d68eda1e1b:Radek
9a2f177dc1a0e363bd0321cc562bea0a:Ahoj3
57f2c161f9a6f3b83ab85112066bd736:0L0m0Uc
431301000c51954230c969f2e04c3add:P4ssword
f7071aeeee796fc50837cf1ceaabb6dd:JaJaJa42
1751656a63e56f0a110003f48477d257:0L0m0Uc9
```

Nalezené vzory pro SHA1. Hledání probíhalo cca 1h
```
81531563ac7a743806818e3009def19e3b5dfbeb:XGF223
aeca437d9727c6881640d59c79c53557f3e24628:Ahoj432
d8df2150ea257ece92d7d461e1edf7dada83c6ad:BepsBeps
79bd7a523faccc0dff73d64a1b57f95eb8052ab7:B3PsB3ps
```



## Replikace
pro spouštění (windows, pro linux nainstalovat hashcat a provolat se stejnými argumenty jako v .cmd souborech) potřeba stáhnout [hashcat](https://hashcat.net/hashcat/) a rozbalit do hashcat složky aby cesta `./ukol07/hashcat/hashcat.exe` byla platná

