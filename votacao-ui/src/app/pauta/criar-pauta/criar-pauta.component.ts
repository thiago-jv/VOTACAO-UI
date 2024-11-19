import { Component, OnInit } from '@angular/core';
import { PautaService } from '../pauta.service';
import { NgForm } from '@angular/forms';
import { Associado, Pauta } from 'src/app/core/model';
import { AssociadoService } from 'src/app/associado/associado.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pauta',
  templateUrl: './criar-pauta.component.html',
  styleUrls: ['./criar-pauta.component.css']
})
export class CriarPautaComponent implements OnInit {
  pauta = new Pauta();
  associados: Associado[] = [];
  associadosSelecionados: Associado[] = [];

  constructor(
    private pautaService: PautaService,
    private associadoService: AssociadoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova pauta');
    this.carregarAssociados();
  }

  confirmar(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja confirmar esta ação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adicionar(form);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'A ação foi cancelada',
          life: 3000
        });
      }
    });
  }

  adicionar(form: NgForm) {
    this.pauta.associadosId = this.associadosSelecionados.map(associado => ({
      id: associado.id
    }));

    this.pautaService.adicionar(this.pauta)
      .then((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pauta',
          detail: 'A pauta foi adicionada com sucesso!',
          life: 6000
        });
      })
      .catch((error) => {
        const errorMessage = this.errorHandler.handle(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 8000
        });

        if (error?.campos) {
          error.campos.forEach((campo: any) => {
            const formControl = form.controls[campo.nome];
            if (formControl) {
              formControl.setErrors({ customError: campo.mensagemUsuario });
            }
          });
        }
      });
  }

  carregarAssociados() {
    return this.associadoService.listar()
      .then(response => {
        this.associados = response.map(a => ({ nome: a.nome, value: a }));
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao buscar os associados.',
          life: 8000
        });
      });
  }

  get editando() {
    return Boolean(this.pauta.id);
  }

  titlePauta() {
    this.title.setTitle(`Edição pauta: ${this.pauta.id}`);
  }

  novo(form: NgForm) {
    form.reset();
    this.pauta = new Pauta();
    this.router.navigate(['/pautas/novo']);
  }
}
