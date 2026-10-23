# BibliotecaJem

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.37.

## Requisitos

| Herramienta | Versión |
| ----------- | ------- |
| Node.js     | **24.x LTS** (probado con `v24.22.1`) |
| npm         | **11.x** (probado con `11.19.1`) |

La versión exacta está fijada en [`.nvmrc`](.nvmrc) y [`.node-version`](.node-version), y
`package.json` declara `engines`, así que npm avisa si el equipo tiene otro Node.

Si usas [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm) o asdf, basta con:

```bash
nvm install   # o: fnm install / asdf install nodejs
nvm use       # lee .nvmrc automáticamente
```

## Instalación y arranque (en cualquier equipo)

```bash
npm ci        # instala EXACTAMENTE las versiones del package-lock.json
npm start     # servidor de desarrollo en http://localhost:4200/
```

Usa siempre `npm ci`, no `npm install`: `npm ci` reconstruye `node_modules` desde el
lockfile, que es lo que garantiza que a todos les quede el mismo proyecto.

Otros comandos:

```bash
npm run build         # build de producción en dist/
npm run watch         # build en modo watch (desarrollo)
npm test              # pruebas unitarias (Karma)
```

## Estado de la conexión con Firebase

| Elemento | Valor |
| -------- | ----- |
| Proyecto | **Biblio** → `biblio-30d93` (cuenta `brayanneko17@gmail.com`) |
| Configuración | [`src/environments/environment.ts`](src/environments/environment.ts) |
| Base de datos | **`default`**, región `nam5`, edición Enterprise (free tier) |
| Reglas | [`firestore.rules`](firestore.rules) — lectura pública de `libros`, escritura sólo `admin@jem.edu.pe` |
| Auth | Email/Password activo; usuarios `admin@jem.edu.pe` y `brayanneko17@gmail.com` |

### Detalle importante: el ID de la base de datos

La base de este proyecto se creó con el ID **`default`** y **no** con **`(default)`**, que es
el que el SDK de Firebase busca por defecto (de ahí el famoso
`Firestore: Database '(default)' not found`). Por eso
[`src/app/core/services/firebase.ts`](src/app/core/services/firebase.ts) le pasa el ID como
tercer argumento:

```ts
initializeFirestore(this.app, { localCache: ... }, "default");
```

Si algún día se crea la base `(default)` (en este proyecto eso exige habilitar facturación
en Google Cloud), basta con quitar ese tercer argumento y migrar los datos.

### Cómo volver a publicar las reglas

`firebase deploy --only firestore:rules` **falla en este proyecto**: como no existe la base
`(default)`, la CLI intenta crearla y devuelve `403 ... requires billing to be enabled`.

Rápido y seguro: consola de Firebase → **Firestore → Rules**, pegar el contenido de
[`firestore.rules`](firestore.rules) y *Publish*.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
