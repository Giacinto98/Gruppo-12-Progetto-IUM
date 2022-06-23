# GreenWorld - Progetto Interazione Uomo-Macchina

## Live

E' disponibile una versione online del sistema a [questo](https://greenworld-ium.pages.dev/) indirizzo.

## Utilizzo

Il sistema presenta solo l'implementazione del front end, pertanto non prevede il caricamento di contenuti da database. Tuttavia l'utente può effettuare alcune azioni i cui risultati vengono resi persistenti nel local storage del browser.
Per eliminare i contenuti aggiunti dall'utente e quindi resettare il sistema basterà fare il logout. Per il login e la
registrazione qualsiasi input, purché correttamente formattato, verrà accettato e si avrà accesso all'account di default.
Queste scelte sono state prese per permettere agli utenti di interagire e testare il sistema senza la necessità di un back end.

## Installazione

Nel caso si preferisca testare il sistema localmente, si possono seguire queste istruzioni:

- Assicurati di avere installato [Node.js](https://nodejs.dev/download)
- Clona la repository

  ```bash
  git clone https://github.com/Ivanf1/greenworld-frontend.git
  ```

- Nella root della repository

  ```bash
  npm install
  ```

- Successivamente

  ```bash
  npm run start
  ```

  Si avvierà il development server su [localhost:3000](http://localhost:3000)

## Alcune documentazioni di riferimento usate durante lo sviluppo del sistema

### Principali

- [React](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/docs/en/v6)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React + Typescript](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

### Altre librerie usate

- [Framer Motion](https://www.framer.com/motion/)
- [Swiper](https://swiperjs.com/swiper-api)
- [react-multi-select-component](https://github.com/hc-oss/react-multi-select-component)
- [react-dropzone](https://react-dropzone.js.org/)
- [Formik](https://formik.org/docs/overview)
- [Leaflet](https://leafletjs.com/)
- [Leaflet.GestureHandling](https://github.com/elmarquis/Leaflet.GestureHandling#readme)
- [react-intersection-observer](https://react-intersection-observer.vercel.app/?path=/docs/introduction--page)
- [React Query](https://react-query.tanstack.com/overview)

### Layout

- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
