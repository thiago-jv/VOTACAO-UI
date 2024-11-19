import { Component, OnInit, ViewChild } from '@angular/core';
import { Associado, AssociadoFiltro } from 'src/app/core/model';
import { AssociadoService } from '../associado.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-listar-associado',
  templateUrl: './listar-associado.component.html',
  styleUrls: ['./listar-associado.component.css']
})
export class ListarAssociadoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AssociadoFiltro();
  associados: Associado[] = [];
  @ViewChild('tabela') grid: any;

  constructor(private associadoService: AssociadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.associadoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.associados = resultado.associados;
      })
      .catch(error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao listar os associados.', life: 8000});
        console.error(error);
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first || 0) / (event.rows !== undefined ? event.rows : 10);
    this.pesquisar(pagina);
  }
  

  confirmarExclusao(associado: any) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja confirmar esta ação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(associado);
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

  excluir(associado: any) {
    this.associadoService.excluir(associado.id)
      .then(() => { 
        this.pesquisar();  
        this.messageService.add({severity: 'success', summary: 'Associado', detail: 'O associado foi excluído com sucesso!', life: 6000
        });
        
      })
      .catch(error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error, life: 8000});
      });
  }
}
