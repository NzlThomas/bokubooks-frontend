# Bokubooks

Bokubooks est une application full-stack permettant aux utilisateurs de gérer leur collection de livres.

**L'application est séparée en deux repositories différents, vous consultez actuellement la partie Frontend de l'application.**

[Cliquez pour accéder au repository du Backend](https://github.com/NzlThomas/bokubooks-backend)

## Fonctionnalités

- Ajouter un livre à sa collection
- Consulter sa collection (barre de recherche et filtres)
- Noter les livres lus et possédés
- Présence d'étiquettes sur chaque livre (Lu, En cours, A lire)
- Ajouter une note à un livre
- Liste d'envies
- Statistiques de sa collection
- Changement du nom d'utilisateur et du mot de passe

## Stack utilisée

### Frontend

- React
- React Router DOM
- Axios
- CSS Modules
- React Toastify
- Recharts (Pour le graphique des statistiques)

### Backend

- Node.js
- Express.js
- Prisma ORM
- Base de donnée PostgreSQL

### Authentification

- JWT

## Installation

### Cloner le projet

```bash
git clone git@github.com:NzlThomas/tracker-frontend.git
```

### Installer les dépendances

A la racine du projet :

```bash
npm i
```

### Lancer le frontend

```bash
npm run dev
```

## Initialisation du Backend

[Référez vous au README de ce repository](https://github.com/NzlThomas/bokubooks-backend)
