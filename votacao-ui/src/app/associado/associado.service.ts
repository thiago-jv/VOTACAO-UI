import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Associado, AssociadoFiltro, AssociadoResponse } from '../core/model';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AssociadoService {

  associadoUrl = "http://localhost:8089/votacaoapi/v1/associados";

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  async pesquisar(filtro: AssociadoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.intensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    try {
      const response = await this.http.get<AssociadoResponse>(`${this.associadoUrl}`, {
        params: params, 
        responseType: 'json'
      }).toPromise();

      if (response && response.content) {
        const associados = response.content;
        const resultado = {
          associados,
          total: response.totalElements
        };
        return resultado;
      } else {
        throw new Error('Resposta inválida: estrutura de dados não encontrada');
      }
    } catch (error) {
      console.error('Erro ao pesquisar associados:', error);
      throw error;
    }
  }

  listar(): Promise<Associado[]> {
    return firstValueFrom(this.http.get<Associado[]>(`${this.associadoUrl}/todos`))
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('Erro ao carregar associados:', error);
        throw error;
      });
  }

  adicionar(associado: Associado): Promise<Associado> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return firstValueFrom(this.http.post<Associado>(this.associadoUrl, JSON.stringify(associado), { headers }))
      .then(response => {
        if (!response) {
          throw new Error('Erro: Resposta vazia');
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao cadastrar associado:', error);
        return Promise.reject(error);
      });
  }

  atualizar(associado: Associado): Promise<Associado> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return firstValueFrom(
      this.http.put<Associado>(`${this.associadoUrl}/${associado.id}`, 
        JSON.stringify(associado), 
        { headers })
    )
      .then(response => {
        if (!response) {
          throw new Error('Erro: Resposta vazia');
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao atualizar associado:', error);
        return Promise.reject(error);
      });
  }

  buscarPorCodigo(id: number): Promise<Associado> {
    return firstValueFrom(this.http.get<Associado>(`${this.associadoUrl}/${id}`))
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('Erro ao buscar associado:', error);
        return Promise.reject(error);
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.associadoUrl}/${id}`).toPromise()
      .then(() => {
        console.log('Associado excluído com sucesso');
      })
      .catch(error => {
        const mensagemErro = this.errorHandler.handle(error);
        console.error(mensagemErro);
        return Promise.reject(mensagemErro);
      });
  }
}
