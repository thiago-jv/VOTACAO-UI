import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { ListarAssociadoComponent } from './listar-associado/listar-associado.component';
import { CriarAssociadoComponent } from './criar-associado/criar-associado.component';

const routes: Routes = [
    {path: 'associados', component: ListarAssociadoComponent},
    {path: 'associados/novo', component: CriarAssociadoComponent},
    {path: 'associados/:id', component: CriarAssociadoComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssociadoRoutingModule {
}
