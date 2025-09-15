# Configuration du Déploiement Automatique

Ce projet utilise GitLab CI/CD pour automatiser le déploiement sur votre serveur FTP.

## Configuration des Variables d'Environnement

Pour que le déploiement fonctionne, vous devez configurer les variables suivantes dans GitLab :

### Dans GitLab : Settings > CI/CD > Variables

Ajoutez les variables suivantes (cochez "Masked" pour les données sensibles) :

| Variable | Description | Exemple | Masked |
|----------|-------------|---------|--------|
| `FTP_HOST` | Adresse du serveur FTP | `ftp.mondomaine.com` | Non |
| `FTP_USERNAME` | Nom d'utilisateur FTP | `monuser` | Oui |
| `FTP_PASSWORD` | Mot de passe FTP | `monmotdepasse` | Oui |
| `FTP_REMOTE_PATH` | Chemin distant sur le serveur | `/public_html` ou `/www` | Non |

## Fonctionnement du Pipeline

### Étapes du Pipeline

1. **Build** : Compilation de l'application Angular en mode production
2. **Deploy** : Upload des fichiers sur le serveur FTP (uniquement pour la branche `main`)

### Déclenchement

- **Automatique** : Le build se déclenche à chaque push sur `main` ou `develop`
- **Manuel** : Le déploiement est configuré en mode manuel par défaut pour plus de sécurité
- **Automatique** : Décommentez la section `deploy_auto` dans `.gitlab-ci.yml` pour un déploiement automatique

### Sécurité

- Le déploiement ne se fait que sur la branche `main`
- Les variables sensibles sont masquées dans GitLab
- Le déploiement est en mode manuel par défaut

## Activation du Déploiement Automatique

Si vous souhaitez un déploiement automatique à chaque push sur `main` :

1. Ouvrez `.gitlab-ci.yml`
2. Décommentez la section `deploy_auto` (lignes 47-62)
3. Commentez ou supprimez la section `deploy_production`

## Structure des Fichiers

```
├── .gitlab-ci.yml          # Configuration du pipeline CI/CD
├── DEPLOYMENT.md           # Ce fichier d'instructions
└── dist/alec-cv-site/     # Dossier généré contenant l'application buildée
```

## Dépannage

### Erreurs Communes

1. **Erreur de connexion FTP** : Vérifiez les variables `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`
2. **Erreur de chemin** : Vérifiez la variable `FTP_REMOTE_PATH`
3. **Build échoue** : Vérifiez que `npm run build` fonctionne localement

### Logs

Consultez les logs du pipeline dans GitLab : `CI/CD > Pipelines > [Votre Pipeline] > Jobs`

## Commandes Utiles

```bash
# Test local du build
npm run build

# Test de connexion FTP (remplacez par vos valeurs)
lftp -u username,password ftp.mondomaine.com
```

## Support

En cas de problème, vérifiez :
1. Les variables d'environnement dans GitLab
2. Les permissions sur votre serveur FTP
3. Les logs du pipeline GitLab CI/CD