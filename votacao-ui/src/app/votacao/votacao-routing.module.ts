import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { CriarVotacaoComponent } from './criar-votacao/criar-votacao.component';

const routes: Routes = [
    {path: 'votacao/novo', component: CriarVotacaoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VotacaoRoutingModule {
}
