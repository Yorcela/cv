# Guide de Déploiement GitLab CI/CD

Ce guide explique comment configurer et utiliser le pipeline CI/CD pour déployer automatiquement votre application Angular sur un serveur FTP/SFTP.

## Configuration des Variables d'Environnement

### Variables Requises dans GitLab

Allez dans **Settings > CI/CD > Variables** de votre projet GitLab et ajoutez :

| Variable | Description | Exemple |
|----------|-------------|----------|
| `FTP_HOST` | Adresse du serveur FTP/SFTP | `ftp.example.com` |
| `FTP_USERNAME` | Nom d'utilisateur FTP | `myuser` |
| `FTP_PASSWORD_BASE64` | Mot de passe FTP encodé en Base64 | `bXlwYXNzd29yZA==` |
| `FTP_REMOTE_PATH` | Chemin distant sur le serveur | `/public_html` |

### Encodage du Mot de Passe en Base64

Pour éviter les problèmes avec les caractères spéciaux, encodez votre mot de passe :

```bash
# Encoder votre mot de passe
echo -n "votre_mot_de_passe" | base64
```

Utilisez le résultat comme valeur pour `FTP_PASSWORD_BASE64`.

### Configuration de Sécurité

- ✅ Marquez `FTP_USERNAME` et `FTP_PASSWORD_BASE64` comme **"Masked"**
- ✅ Marquez toutes les variables comme **"Protected"** si vous voulez les limiter aux branches protégées

## Fonctionnement du Pipeline

### Stages

1. **Build** : Compilation de l'application Angular en mode production
2. **Deploy** : Déploiement des fichiers sur le serveur FTP/SFTP

### Déploiement Manuel (Par Défaut)

Par défaut, le déploiement est **manuel** pour des raisons de sécurité :
- Le build se lance automatiquement à chaque push sur `main`
- Le déploiement doit être déclenché manuellement depuis l'interface GitLab

### Activation du Déploiement Automatique

Pour activer le déploiement automatique, modifiez `.gitlab-ci.yml` :

```yaml
deploy:
  stage: deploy
  # Supprimez ou commentez cette ligne :
  # when: manual
```

## Structure des Fichiers

Après le build, les fichiers sont générés dans :
- **Dossier local** : `dist/alec-cv-site/`
- **Dossier distant** : Défini par `$FTP_REMOTE_PATH`

## Dépannage

### Erreurs Communes

1. **Erreur d'authentification**
   - Vérifiez `FTP_USERNAME` et `FTP_PASSWORD_BASE64`
   - Testez la connexion manuellement

2. **Erreur de chemin**
   - Vérifiez `FTP_REMOTE_PATH`
   - Assurez-vous que le dossier existe sur le serveur

3. **Problème SSL/TLS**
   - Le pipeline désactive SSL par défaut (`set ftp:ssl-allow no`)
   - Modifiez si votre serveur requiert SSL

### Commandes de Test

```bash
# Tester la connexion FTP
lftp -u username,password ftp.example.com

# Décoder un mot de passe Base64
echo "SnNhZEpkZjIwMTYh" | base64 -d
```

## Support

Pour plus d'informations :
- [Documentation GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Documentation LFTP](https://lftp.yar.ru/lftp-man.html)