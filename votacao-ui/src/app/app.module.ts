import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AssociadoModule } from './associado/associado.module';

import { PautaModule } from './pauta/pauta.module';
import { VotacaoModule } from './votacao/votacao.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './core/app-routing.module';


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
    AppRoutingModule
    
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
