import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PautaService } from '../pauta.service';
import { Associado, PautaAssociado } from 'src/app/core/model';
import { AssociadoService } from 'src/app/associado/associado.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dialog-editar-pauta',
  templateUrl: './dialog-editar-pauta.component.html',
  styleUrls: ['./dialog-editar-pauta.component.css']
})
export class DialogEditarPautaComponent implements OnChanges {

  @Input() id: number | null = null;
  @Input() display: boolean = false;
  pautaAssociado = new PautaAssociado();
  descricao: string = '';
  associadosSelecionados: number[] = [];
  associadosDisponiveis: Associado[] = [];
  isSalvarDisabled: boolean = false;

  constructor(
    private pautaService: PautaService,
    private associadoService: AssociadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id !== null) {
      this.loadContent();
    }
  }

  loadContent(): void {
    if (this.id !== null) {
      this.buscarPautaAssociadosPorId(this.id);
      this.display = true;
    }
  }

  buscarPautaAssociadosPorId(id: number): void {
    this.pautaService.buscarPautaPassociadosPorId(id)
      .then(response => {
        this.pautaAssociado = response;
        this.descricao = this.pautaAssociado.descricao || '';

        this.associadosSelecionados = this.pautaAssociado.associados?.map(associado => associado.id)
          .filter(id => id !== undefined) as number[] || [];

        this.carregarAssociadosDisponiveis();
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao carregar pauta e associados.',
          life: 8000
        });
        console.error('Erro ao carregar pauta e associados', error);
      });
  }

  carregarAssociadosDisponiveis(): void {
    this.associadoService.listar()
      .then(associados => {
        this.associadosDisponiveis = associados;
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao carregar associados disponíveis.',
          life: 8000
        });
        console.error('Erro ao carregar associados disponíveis', error);
      });
  }

  fechar(): void {
    this.display = false;
  }

  confirmar(): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja confirmar esta ação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salvarEdicao();
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

  salvarEdicao(): void {
    const associadosUnicos = this.associadosSelecionados.map(id => ({ id }));

    this.pautaAssociado.descricao = this.descricao;
    this.pautaAssociado.associados = associadosUnicos;
    delete this.pautaAssociado.habilitado;

    this.pautaService.atualizarPauta(this.pautaAssociado)
      .then((response) => {
        this.fechar();
        this.messageService.add({
          severity: 'success',
          summary: 'Pauta',
          detail: 'A pauta foi atualizada com sucesso!',
          life: 6000
        });
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao atualizar a pauta.',
          life: 8000
        });
      });
  }

  get editando(): boolean {
    return Boolean(this.pautaAssociado.id);
  }
}
