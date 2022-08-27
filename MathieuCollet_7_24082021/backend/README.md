# backend

## Project setup
```
npm install
```

Créez un fichier *.env* à la racine du projet backend avec une variable **SECRET_KEY** (de votre choix) et une variable **PORT** pour le serveur.

### Database setup

L'application utilise une base **PostgreSQL** dont les paramètres de connexions sont stockés dans un fichier *.env*.

1. Installez une base de donnée PostgreSQL ou utilisez une instance chez un provider
2. Remontez un dump de la base, exemple :
  - création d'une base *groupomania* et d'un utilisateur *groupomania*
  ```
  CREATE DATABASE groupomania;
  CREATE USER groupomania WITH ENCRYPTED PASSWORD 'yourpass';
  GRANT ALL PRIVILEGES ON DATABASE groupomania TO groupomania;
  ```
  - retauration d'un dump *groupomania.dump*
  ```
  pg_restore -U postgres --clean --dbname groupomania groupomania.dump
```
3. Ajoutez au fichier *.env* à la racine du projet backend les variables **DB_HOST**, **DB_DATABASE**, **DB_USERNAME**, **DB_PASSWORD**

### Hot-reloads for development
```
nodemon server
```

## Paramètres des API

### Une API gère la partie utilisateurs et authentification :

| Verbe | Paramètre | Corps de la demande | Réponse |
|-------|-----------|---------------------|---------|
| GET   | /signup | Requête JSON contenant un objet avec username, email, password et booléen moderator | Retourne l'uuid de l'utilisateur créé |
| POST  | /login | Requête JSON contenant l'email et le mot de passe de l'utilisateur | Retourne un objet avec les informations de base de l'utilisateur et un token |
| GET   | /users | - | Retourne un tableau de tous les utilisateurs |
| DELETE | /users/{id} ({id} doit être remplacé par l’id d’un utilisateur) | - | Retourne la confirmation de la suppression de l'utilisateur |


### Une API gère le forum de publications texte :

| Verbe | Paramètre | Corps de la demande | Réponse |
|-------|-----------|---------------------|---------|
| POST | / | Requête JSON contenant un objet de publication | Retourne l'objet publication |
| GET | / | - | Retourne un tableau de toutes les publications |
| GET | /{id} ({id} doit être remplacé par l’id d’une publication) | - | Retourne l'objet publication correspondant à {id}, identifiant d’une publication |
| PUT | /{id} ({id} doit être remplacé par l’id d’une publication) | Requête JSON contenant un objet de publication | Retourne l'objet publication modifié |
| POST | /{id} ({id} doit être remplacé par l’id d’une publication) | Requête JSON contenant un objet de commentaire pour l'objet publication correspondant à {id}, identifiant d’une publication | Retourne l'objet commentaire |
| DELETE | /{id} ({id} doit être remplacé par l’id d’une publication) | - | Retourne un message de confirmation de la suppression de la publication |
| POST | /{id}/like ({id} doit être remplacé par l’id d’une publication) | - | retourne un message de confirmation d'ajout (ou de suppression du like s'il existe) |
| DELETE | /comment/{id} ({id} doit être remplacé par l’id d’un commentaire) | - | Retourne un message de confirmation de la suppression du commentaire |