import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarVotacaoComponent } from './criar-votacao/criar-votacao.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    CriarVotacaoComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    SelectButtonModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    CriarVotacaoComponent
  ]
})
export class VotacaoModule { }
