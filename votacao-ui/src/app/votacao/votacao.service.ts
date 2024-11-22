import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Votacao } from '../core/model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  votacaoUrl: string = `${environment.apiUrl}/v1/votacoes`;

  constructor(private http: HttpClient) { }

  adicionar(votacao: Votacao): Promise<Votacao> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return firstValueFrom(this.http.post<Votacao>(this.votacaoUrl, JSON.stringify(votacao), { headers }))
      .then(response => {
        if (!response) {
          throw new Error('Erro: Resposta vazia');
        }
        return response;
      })
      .catch(error => {
        console.error('Erro ao realizar votação:', error);
        return Promise.reject(error);
      });
  }
}
