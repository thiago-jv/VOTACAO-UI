import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Associado } from 'src/app/core/model';
import { AssociadoService } from '../associado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-criar-associado',
  templateUrl: './criar-associado.component.html',
  styleUrls: ['./criar-associado.component.css']
})
export class CriarAssociadoComponent implements OnInit {

  associado = new Associado();

  constructor(
    private associadoService: AssociadoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo associado');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarAssociados(id);
    }
  }

  confirmar(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja confirmar esta ação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salvar(form);
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
    this.associadoService.adicionar(this.associado)
      .then((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Associado',
          detail: 'O associado foi adicionado com sucesso!',
          life: 6000
        });
        this.titleAssociado();
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao adicionar o associado.',
          life: 8000
        });
      });
  }

  atualizar(form: NgForm) {
    this.associadoService.atualizar(this.associado)
      .then(retorno => {
        this.associado = retorno;
        this.messageService.add({
          severity: 'success',
          summary: 'Associado',
          detail: 'O associado foi atualizado com sucesso!',
          life: 6000
        });
        this.titleAssociado();
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

  get editando() {
    return Boolean(this.associado.id);
  }

  titleAssociado() {
    this.title.setTitle(`Edição associado: ${this.associado.id}`);
  }

  novo(form: NgForm) {
    form.reset();
    this.associado = new Associado();
    this.router.navigate(['/associados/novo']);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  carregarAssociados(id: number) {
    this.associadoService.buscarPorCodigo(id)
      .then(retorno => {
        this.associado = retorno;
        this.titleAssociado();
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

}
