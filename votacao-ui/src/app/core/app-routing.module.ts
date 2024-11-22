import { NgModule } from "@angular/core";
import { CriarAssociadoComponent } from "../associado/criar-associado/criar-associado.component";
import { ListarAssociadoComponent } from "../associado/listar-associado/listar-associado.component";
import { CriarPautaComponent } from "../pauta/criar-pauta/criar-pauta.component";
import { ListarPautaComponent } from "../pauta/listar-pauta/listar-pauta.component";
import { CriarVotacaoComponent } from "../votacao/criar-votacao/criar-votacao.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [

    {path: 'associados', component: ListarAssociadoComponent},
    {path: 'associados/novo', component: CriarAssociadoComponent},
    {path: 'associados/:id', component: CriarAssociadoComponent},
  
    {path: 'pautas', component: ListarPautaComponent},
    {path: 'pautas/novo', component: CriarPautaComponent},
  
    {path: 'votacao/novo', component: CriarVotacaoComponent},
    
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  