import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handle(errorResponse: any): string {
    const corpo = this.obterCorpoErro(errorResponse); 

    if (!corpo) {
      return 'Erro desconhecido';
    }

    if (corpo.status === 409 && corpo.type === 'https://com.votacao/entidade-em-uso') {
      return this.formatarErroVotacaoAssociado(corpo);
    }

     if (corpo.status === 400 && corpo.type === 'https://com.votacao/erro-negocio') {
      return corpo.mensagemUsuario || corpo.detail || 'Erro de regra de negócio';
    }


    if (this.temErrosDeCampo(corpo)) {
      return this.extrairErrosDeCampo(corpo);
    }

    return this.obterMensagemErroGenerica(corpo);
  }

  private obterCorpoErro(respostaErro: any): any {
    return respostaErro?.error || respostaErro?.erro || null;
  }

  private temErrosDeCampo(corpo: any): boolean {
    return Array.isArray(corpo?.campos) && corpo.campos.length > 0;
  }

  private extrairErrosDeCampo(corpo: any): string {
    const mensagensDeErro = corpo.campos.map((campo: any) => {
      const nomeCampo = campo.nome || 'Campo não especificado';
      const mensagemUsuario = campo.mensagemUsuario || 'Erro não detalhado';
      return `${nomeCampo}: ${mensagemUsuario}`;
    });

    return mensagensDeErro.join(', ');
  }

  private formatarErroVotacaoAssociado(corpo: any): string {
    const mensagem = corpo.mensagemUsuario || corpo.detail;
    return mensagem;
  }

  private obterMensagemErroGenerica(corpo: any): string {
    const mensagemUsuario = corpo?.mensagemUsuario || corpo?.detail || 'Erro desconhecido';
    return mensagemUsuario;
  }
}
