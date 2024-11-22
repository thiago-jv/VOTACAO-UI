import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { DialogEditarPautaComponent } from './dialog-editar-pauta/dialog-editar-pauta.component';
import { CriarPautaComponent } from './criar-pauta/criar-pauta.component';
import { ListarPautaComponent } from './listar-pauta/listar-pauta.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PautaRoutingModule } from './pauta-routing.module';


@NgModule({
  declarations: [
    CriarPautaComponent,
    ListarPautaComponent,
    DialogEditarPautaComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    PautaRoutingModule
  ],
  exports: [
    CriarPautaComponent,
    ListarPautaComponent
  ]
})
export class PautaModule { }
