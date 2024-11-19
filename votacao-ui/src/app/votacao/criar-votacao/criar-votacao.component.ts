import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VotacaoService } from '../votacao.service';
import { Associado, Pauta, Votacao } from 'src/app/core/model';
import { AssociadoService } from 'src/app/associado/associado.service';
import { PautaService } from 'src/app/pauta/pauta.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-votacao',
  templateUrl: './criar-votacao.component.html',
  styleUrls: ['./criar-votacao.component.css']
})
export class CriarVotacaoComponent implements OnInit {

  votacao = new Votacao();
  associados: Associado[] = [];
  pautas: Pauta[] = [];
  
  tipoVoto = [
    { label: 'Sim', value: 'SIM' },
    { label: 'Não', value: 'NAO' }
  ];

  constructor(
    private votacaoService: VotacaoService,
    private associadoService: AssociadoService,
    private pautaService: PautaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova votação');
    this.carregarAssociados();
  }

  confirmar(form: NgForm): void {
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

  adicionar(form: NgForm): void {
    this.votacaoService.adicionar(this.votacao)
      .then((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pauta',
          detail: 'A votação foi realizada com sucesso!',
          life: 6000
        });
      })
      .catch((error) => {
        const mensagemErro = this.errorHandler.handle(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: mensagemErro,
          life: 8000
        });
      });
  }

  carregarAssociados(): void {
    this.associadoService.listar()
      .then(response => {
        this.associados = response.map(a => ({ nome: a.nome, value: a.id }));
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao buscar os associados',
          life: 8000
        });
      });
  }

  get editando(): boolean {
    return Boolean(this.votacao.id);
  }

  carregarPautasPorAssociado(idAssociado: number): void {
    this.pautaService.carregarPautaPorAssociadoSim(idAssociado)
      .then(response => {
        this.pautas = response.map(p => ({
          descricao: p.descricao,
          value: p.id
        }));
      })
      .catch(error => {
        console.error('Erro ao carregar pautas:', error);
        this.pautas = [];
      });
  }

  onAssociadoChange(associadoId: number): void {
    this.carregarPautasPorAssociado(associadoId);
  }

  titlePauta(): void {
    this.title.setTitle(`Edição votação: ${this.votacao.id}`);
  }

  novo(form: NgForm): void {
    form.reset();
    this.votacao = new Votacao();
    this.router.navigate(['/votacao/novo']);
  }

}
