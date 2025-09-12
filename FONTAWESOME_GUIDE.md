# Guide d'utilisation FontAwesome Pro

Votre projet utilise maintenant FontAwesome Pro 5.15.4 qui offre plusieurs styles d'icônes :

## Styles disponibles

### Solid (fas)
```html
<i class="fas fa-user"></i>
<i class="fas fa-home"></i>
<i class="fas fa-envelope"></i>
```

### Regular (far)
```html
<i class="far fa-user"></i>
<i class="far fa-home"></i>
<i class="far fa-envelope"></i>
```

### Light (fal) - Pro uniquement
```html
<i class="fal fa-user"></i>
<i class="fal fa-home"></i>
<i class="fal fa-envelope"></i>
<i class="fal fa-cloud-download"></i>
```

### Duotone (fad) - Pro uniquement
```html
<i class="fad fa-user"></i>
<i class="fad fa-home"></i>
<i class="fad fa-envelope"></i>
```

### Brands (fab)
```html
<i class="fab fa-linkedin"></i>
<i class="fab fa-github"></i>
<i class="fab fa-twitter"></i>
```

## Exemples d'utilisation dans votre CV

### Icônes de contact
```html
<i class="fal fa-envelope"></i> <!-- Email -->
<i class="fal fa-phone"></i> <!-- Téléphone -->
<i class="fal fa-map-marker-alt"></i> <!-- Adresse -->
<i class="fab fa-linkedin"></i> <!-- LinkedIn -->
<i class="fab fa-github"></i> <!-- GitHub -->
```

### Icônes de compétences
```html
<i class="fal fa-code"></i> <!-- Développement -->
<i class="fal fa-users"></i> <!-- Management -->
<i class="fal fa-chart-line"></i> <!-- Analytics -->
<i class="fal fa-cogs"></i> <!-- Configuration -->
```

### Icônes d'expérience
```html
<i class="fal fa-briefcase"></i> <!-- Travail -->
<i class="fal fa-calendar"></i> <!-- Dates -->
<i class="fal fa-building"></i> <!-- Entreprise -->
<i class="fal fa-award"></i> <!-- Réalisations -->
```

### Icônes d'éducation
```html
<i class="fal fa-graduation-cap"></i> <!-- Diplôme -->
<i class="fal fa-university"></i> <!-- École -->
<i class="fal fa-certificate"></i> <!-- Certification -->
```

## Avantages de FontAwesome Pro

- **Plus d'icônes** : 7,000+ icônes vs 1,600 en version gratuite
- **Styles Light et Duotone** : Pour un design plus moderne
- **Meilleure qualité** : Icônes optimisées et cohérentes
- **Pas de limite de trafic** : Hébergement local

## Fichiers importés

Le fichier `src/styles.css` importe maintenant :
```css
@import 'assets/fontawesome/css/all.css';
```

Ceci inclut tous les styles (solid, regular, light, duotone, brands) en une seule importation.