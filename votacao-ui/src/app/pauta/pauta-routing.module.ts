import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { ListarPautaComponent } from './listar-pauta/listar-pauta.component';
import { CriarPautaComponent } from './criar-pauta/criar-pauta.component';

const routes: Routes = [
    {path: 'pautas', component: ListarPautaComponent},
    {path: 'pautas/novo', component: CriarPautaComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PautaRoutingModule {
}
