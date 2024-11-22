import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associado, Pauta, PautaAssociado, PautaFiltro, PautaResponse } from '../core/model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PautaService {

  pautaUrl: string = `${environment.apiUrl}/v1/pautas`;

  constructor(private http: HttpClient) { }

  async pesquisar(filtro: PautaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.intensPorPagina.toString());

    if (filtro.habilitado) {
      params = params.set('habilitado', filtro.habilitado);
    }

    try {
      const response = await this.http.get<PautaResponse>(`${this.pautaUrl}`, {
        params: params,
        responseType: 'json'
      }).toPromise();

      if (response && response.content) {
        const pautas = response.content;
        const resultado = {
          pautas,
          total: response.totalElements
        };
        return resultado;
      } else {
        throw new Error('Resposta inválida: estrutura de dados não encontrada');
      }
    } catch (error) {
      console.error('Erro ao pesquisar pautas:', error);
      throw error;
    }
  }

  adicionar(pauta: Pauta): Promise<Pauta> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return firstValueFrom(this.http.post<Pauta>(this.pautaUrl, JSON.stringify(pauta), { headers }))
      .then(response => {
        if (!response) {
          throw new Error('Erro: Resposta vazia');
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao cadastrar pauta:', error);
        return Promise.reject(error);
      });
  }

  buscarPorCodigo(id: number): Promise<Pauta> {
    return this.http.get<Pauta>(`${this.pautaUrl}/${id}`).toPromise()
      .then(response => {
        if (!response) {
          return Promise.reject('Pauta não encontrada');
        }
        return response;
      })
      .catch(error => {
        return Promise.reject('Erro ao buscar a pauta: ' + error.message);
      });
  }

  buscarPautasHabilitadasSim(): Promise<Pauta[]> {
    return firstValueFrom(this.http.get<Pauta[]>(`${this.pautaUrl}/pautasHabilitadasSim`))
      .then(response => {
        return response;
      }).catch(error => {
        console.error('Error ao carregar pautas', error);
        throw error;
      })
  }

  fecharPauta(id: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.pautaUrl}/${id}/habilitaVotacaoFechado`, { headers })
      .toPromise()
      .then(() => {
        return;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  habilitarPautaNao(id: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.pautaUrl}/${id}/habilitaVotacaoNao`, { headers })
      .toPromise()
      .then(() => {
        return;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  habilitarPautaSim(id: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.pautaUrl}/${id}/habilitaVotacaoSim`, { headers })
      .toPromise()
      .then(() => {
        return;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  buscarPautaPassociadosPorId(id: number): Promise<PautaAssociado> {
    return firstValueFrom(this.http.get<PautaAssociado>(`${this.pautaUrl}/${id}/pautasAssociados`))
      .then(response => {
        return response;
      }).catch(error => {
        console.error('Error ao carregar pautas', error);
        throw error;
      })
  }

  atualizarPauta(pauta: Pauta): Promise<Pauta> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return firstValueFrom(this.http.put<Pauta>(this.pautaUrl, JSON.stringify(pauta), { headers }))
      .then(response => {
        if (!response) {
          throw new Error('Erro: Resposta vazia');
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao atualizar pauta:', error);
        return Promise.reject(error);
      });
  }

  carregarPautaPorAssociadoSim(id: number): Promise<Pauta[]> {
    return this.http.get<Pauta[]>(`${this.pautaUrl}/associado/${id}/sim`).toPromise()
      .then(response => {
        if (!response || response.length === 0) {
          return Promise.reject('Nenhuma pauta encontrada com status SIM para o associado');
        }
        return response;
      })
      .catch(error => {
        return Promise.reject('Erro ao buscar pautas: ' + (error.message || error));
      });
  }

}
