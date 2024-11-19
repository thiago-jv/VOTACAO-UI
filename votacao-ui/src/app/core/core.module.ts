import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import { ErrorHandlerService } from './error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ToastModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [MessageService, ErrorHandlerService, ConfirmationService],
})
export class CoreModule { }
