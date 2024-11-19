import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AssociadoModule } from './associado/associado.module';

import { ListarAssociadoComponent } from './associado/listar-associado/listar-associado.component';
import { CriarAssociadoComponent } from './associado/criar-associado/criar-associado.component';
import { PautaModule } from './pauta/pauta.module';
import { VotacaoModule } from './votacao/votacao.module';
import { ListarPautaComponent } from './pauta/listar-pauta/listar-pauta.component';
import { CriarPautaComponent } from './pauta/criar-pauta/criar-pauta.component';
import { CriarVotacaoComponent } from './votacao/criar-votacao/criar-votacao.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [

  {path: 'associados', component: ListarAssociadoComponent},
  {path: 'associados/novo', component: CriarAssociadoComponent},
  {path: 'associados/:id', component: CriarAssociadoComponent},

  {path: 'pautas', component: ListarPautaComponent},
  {path: 'pautas/novo', component: CriarPautaComponent},

  {path: 'votacao/novo', component: CriarVotacaoComponent},
  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AssociadoModule,
    PautaModule,
    VotacaoModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
