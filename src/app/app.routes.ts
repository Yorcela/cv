import { Routes } from '@angular/router';
import { CvPageComponent } from './pages/cv-page.component';
import { DetailedExperiencesComponent } from './pages/detailed-experiences.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

export const routes: Routes = [
  { path: '', component: CvPageComponent },
  { path: 'experiences-detaillees', component: DetailedExperiencesComponent },
  { path: 'recommandations', component: RecommendationsComponent },
  { path: '**', redirectTo: '' }
];
