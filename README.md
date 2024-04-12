# Mon Projet Node.js avec TypeScript

Ce projet est une application backend en Node.js utilisant TypeScript. Il implémente une API pour gérer des entraineurs (`Trainers`) et des pokémons avec une authentification de base.

## Configuration

Pour configurer ce projet sur votre machine locale, suivez ces étapes :

1. Clonez le dépôt :

    ```
    git clone https://github.com/LikaSpb/cda-node-js-ts
    ```

2. Naviguez dans le répertoire du projet :

    ```
    cd https://github.com/LikaSpb/cda-node-js-ts
    ```

3. Installez les dépendances :

    ```
    npm install
    ```

4. Créez un fichier `.env` à la racine du projet et configurez vos variables d'environnement (exemple) :

    ```
    PORT=8080
    JWT_SECRET=VotreSecretJWT
    NODE_ENV=development
    REFRESH_SECRET=blablabla
    ```

## Lancement de l'Application

Pour démarrer l'application, exécutez :

  ```
  npm start
  ```


L'application sera lancée et écoutera sur le port défini dans votre fichier `.env`.

## Tests

Les tests sont écrits avec [Jest](https://jestjs.io/) et peuvent être exécutés avec :

  ```
  npm test
  ```

Assurez-vous que votre application est correctement configurée pour l'environnement de test avant d'exécuter les tests.

## API Endpoints

L'API supporte les endpoints suivants :

- `POST /register` : pour enregistrer un nouvel entraineur.
- `POST /login` : pour connecter un entraineur existant.
- `GET /pokemons` : pour récupérer la liste de tous les pokémons.
- `GET /pokemons/:id` : pour récupérer un pokémon par son ID.

