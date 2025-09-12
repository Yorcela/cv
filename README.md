# CV Site - Alec Roy

Site web de CV personnel développé avec Angular 17, présentant un design moderne et responsive.

## 🚀 Lancement du projet

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://gitlab.com/ralec/cv.git
   cd cv
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   ng serve --port 4201
   ```
   
   Le site sera accessible sur `http://localhost:4201/`

## 🛠️ Scripts disponibles

- `ng serve` : Lance le serveur de développement
- `ng build` : Compile le projet pour la production
- `ng test` : Lance les tests unitaires
- `ng lint` : Vérifie la qualité du code

## 📁 Structure du projet

```
src/
├── app/
│   ├── pages/
│   │   ├── cv-page.component.ts    # Composant principal du CV
│   │   └── cv-page.component.css   # Styles du CV
│   ├── app.component.ts
│   └── app.routes.ts
├── assets/
│   ├── data/                       # Données JSON du CV
│   ├── images/                     # Photos et images
│   ├── i18n/                       # Fichiers de traduction
│   └── pdfs/                       # CV en format PDF
└── styles.css                      # Styles globaux
```

## 🎨 Fonctionnalités

- **Design responsive** : Adapté mobile, tablette et desktop
- **Layout full-width** : Utilise toute la largeur sur desktop
- **Palette moderne** : Couleurs professionnelles inspirées des bonnes pratiques
- **Sections dynamiques** : Expérience, compétences, formation, langues
- **Multilingue** : Support français/anglais

## 🔧 Technologies utilisées

- **Angular 17** : Framework principal
- **TypeScript** : Langage de développement
- **CSS Grid & Flexbox** : Layout responsive
- **Angular CLI** : Outils de développement

## 📝 Développement

Le projet suit les bonnes pratiques Angular avec :
- Architecture modulaire
- Composants réutilisables
- Gestion des données via JSON
- Styles CSS organisés

## 🚀 Déploiement

Pour compiler en production :
```bash
ng build --configuration production
```

Les fichiers compilés seront dans le dossier `dist/`.