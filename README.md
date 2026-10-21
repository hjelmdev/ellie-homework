# Ellies läxhörna

En Angular-app för Ellies veckoläxor. Den här versionen innehåller tyska glosor och fysikbegrepp från vecka 43. Appen är statisk och behöver ingen backend.

## Starta lokalt

Installera Node.js 24 eller senare och kör:

```sh
npm install
npm start
```

Öppna adressen som Angular visar (vanligen http://localhost:4200).

## Uppdatera veckans läxor

Läxornas innehåll finns i `src/app/homework.ts`.

- `germanWords` innehåller en ledtråd och ett svar per rad. Veckodag och uttrycket ”på [dag]” är separata frågor och rättas var för sig.
- `physicsTerms` innehåller begrepp, förklaringar, SVG-illustrationer och eventuella godkända alternativa svar. Illustrationerna ligger i `public/physics/`.

När nästa veckas läxor kommer uppdaterar du listorna där och veckonumret i `src/app/app.ts`. Ämnenas övningslägen är separata från innehållet.

På iPad går det att skriva i svarsfälten med tangentbordet eller använda iPadOS Scribble för att omvandla Apple Pencil-handskrift till text.

## GitHub Pages

Workflowen i `.github/workflows/deploy.yml` bygger och publicerar vid push till `main`. Välj **GitHub Actions** som källa under repots Settings → Pages. Appen använder repo-adressen `/ellie-homework/`.
