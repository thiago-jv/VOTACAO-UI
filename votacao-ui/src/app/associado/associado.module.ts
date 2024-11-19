import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { CriarAssociadoComponent } from './criar-associado/criar-associado.component';
import { ListarAssociadoComponent } from './listar-associado/listar-associado.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    CriarAssociadoComponent,
    ListarAssociadoComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    TableModule,
    RouterModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule
    
    
  ],
  exports: [
    ListarAssociadoComponent,
    CriarAssociadoComponent
  ]
})
export class AssociadoModule { }
