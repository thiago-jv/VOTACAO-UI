import { Component, OnInit } from '@angular/core';
import { Pauta, PautaAssociado, PautaFiltro } from 'src/app/core/model';
import { PautaService } from '../pauta.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-listar-pauta',
  templateUrl: './listar-pauta.component.html',
  styleUrls: ['./listar-pauta.component.css']
})
export class ListarPautaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PautaFiltro();
  pautas: Pauta[] = [];
  selectedPautaId: number | null = null;
  display: boolean = false; 

  constructor(
    private pautaService: PautaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pautaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pautas = resultado.pautas;
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao listar os associados.',
          life: 8000
        });
        console.error(error);
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first || 0) / (event.rows !== undefined ? event.rows : 10);
    this.pesquisar(pagina);
  }

  togglePauta(pauta: any, status: string): void {
    switch (status) {
      case 'SIM':
        this.habilitarPautaSim(pauta)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pauta habilitada com sucesso para o status SIM',
              life: 6000
            });
            this.pesquisar();
          })
          .catch((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro ao habilitar pauta para o status SIM',
              life: 8000
            });
            console.error('Erro ao habilitar pauta:', error);
          });
        break;

      case 'NAO':
        this.habilitarPautaNao(pauta)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pauta desabilitada com sucesso para o status NÃO',
              life: 6000
            });
            this.pesquisar();
          })
          .catch((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro ao habilitar pauta para o status NÃO',
              life: 8000
            });
            console.error('Erro ao desabilitar pauta:', error);
          });
        break;

      case 'FECHADO':
        this.fecharPauta(pauta)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pauta fechada com sucesso',
              life: 6000
            });
            this.pesquisar();
          })
          .catch((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro ao fechar pauta',
              life: 8000
            });
            console.error('Erro ao fechar pauta:', error);
          });
        break;

      default:
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro desconhecido',
          life: 8000
        });
        console.error('Status desconhecido', status);
    }
  }

  habilitarPautaSim(pauta: any): Promise<void> {
    return this.pautaService.habilitarPautaSim(pauta.id);
  }

  habilitarPautaNao(pauta: any): Promise<void> {
    return this.pautaService.habilitarPautaNao(pauta.id);
  }

  fecharPauta(pauta: any): Promise<void> {
    return this.pautaService.fecharPauta(pauta.id);
  }

  openDialog(id: number): void {
    this.selectedPautaId = id;
    this.display = true;
  }
}
