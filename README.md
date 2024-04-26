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
- Första större problemet som vi stötte på var när vi skulle lägga till ett recept till Indexeddb. Problemet var inte att vi inte kunde lägga in recepten utan att det hela tiden blev 2 dubbletter som las in. Vi använde oss av useEffect och efter att vi hade Googlat runt en hel del så insåg vi att React renderar 2 gånger när man är i dev-mode. Lösningen på detta blev att vi hade en tidig return i useEffecten med hjälp av en hook som endast blev true om vi hade tryckt på "läggatillknappen" och som sattes till false i slutet av useEffecten. Detta fungerade kanon men mycket kod blev senare utbytt då vi gick över till att använda form istället. 

- Get by Id från Indexeddb var ett annat problem som vi fastnade på. Vi var mycket nära lösningen tidigt insåg vi efteråt för det enda som saknades var att vi var tvungna att parsa keyId:t från vår Indexeddb-databas för att kunna navigera till rätt route/id.

- Validation av farliga tecken (whitelist/blacklist). Gruppen hade en idé om att bygga in säkerhet mot farliga tecken med tanke på diverse attacker från klientsidan. Efter handledning med Linus så fick vi veta att React hanterar sådant på egen hand så denna kod kunde vi ta bort.

- Ändrade till form i add-recipe. Den tidigare lösningen med att ha 3 separata onChange, det vill säga en per inmatningsfält i add-recipe sidan, fick vi tips om att byta ut till en gemensam form med en enda onChange. Detta medförde att mycket kod kunde refaktoriseras. 

- onChange i formdatan. Ett problem som dock uppstod då vi gick över till form var att då vi skulle tömma inmatningsfälten så gjordes detta endast helt plötsligt i backenden men inte i frontenden. Detta hade fungerat tidigare. Lösningen blev att vi fick lägga samma onChange på vardera inmatningsfält inklusive value.