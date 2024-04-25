This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# `Inlämningsuppgift 4, Projektalternativ 3: Receptsamling, Grupp 2: Alexander, Oskar och Milla`

## `Beskrivning och syfte av webbapplikationen`
Syftet med webbapplikationen är att enkelt kunna spara alla dina favoritrecept. Lägg enkelt till ingredienser och tillagningsinstruktioner, och du är klar! Använd sökfunktionen för att snabbt hitta vilket recept som helst som du har sparat.

## `Instruktioner för att Köras Lokalt`

För att köra denna applikation lokalt, följ dessa steg:

1. Klona projektet till din lokala maskin.
2. Installera beroenden med `npm install`, `yarn install`, `pnpm install` eller `bun install`.
3. Kör utvecklingsservern med `npm run dev`, `yarn dev`, `pnpm dev` eller `bun dev`.
4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare för att se resultatet.

## `Beskrivning av hur datalagring sker`

### `Indexeddb`

Vi har använt Indexeddb till att spara användarens recept.
Detta gjorde vi för att IndexedDB är ett lågnivå-API för klientlagring av stora mängder strukturerad data och passar därför bra till vårt ändamål.

Några andra bra anledningar till att vi använder Inedexeddb är:

- Offline-åtkomst
- Prestanda då den ej behöver göra nätverksförfrågningar
- Sökbarhet då den kan indexera datan oavsett vilken egenskap som helst
- Stor lagringsgräns i jämförelse med andra lagringssät som exempelvis Localstorage som kan lagra max cirka 5MB
- Asynkrona anrop vilket gör så att huvudtråden inte blokeras
- Strukturerad data

### `SessionStorage`

Vi har valt att använda SessionStorage till vår sökfunktion så att sökningen inte försvinner om man byter sida medans applikationen fortfarande är öppen.

Fördelen med Sessionstorage är att den är enkel att använda och försvinner av sig självt när fliken stängs.

## `Utmaningar och lösningar`
- Ändrade till form i add-recipe
- Get by Id från Indexeddb
- Useeffekt körs dubbelt i devmode
- onChange i formdatan
- validation av farliga tecken (whitelist/blacklist)