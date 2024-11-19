export class Associado {
    id?: number;
    nome?: string;
}

export class Pauta {
    id?: number;
    totalSim?: number;
    totalNao?: number;
    totalVoto?: number;
    habilitado?: string;
    descricao?: string;
    dataEntrada?: Date;
    associadosId?: AssociadoId[];
}

export class Votacao {
    id?: number;
    voto?:  string;
    pauta = new PautaId;
    associado = new AssociadoId;
}

export class PautaId {
    id?: number;
}
  
export class AssociadoId {
    id?: number;
}

export class PautaAssociado {
    id?: number;
    descricao?: string;
    habilitado?: string;
    associados: Associado[] = [];
}

export class AssociadoFiltro {
    nome?: string;
    pagina = 0;
    intensPorPagina = 20;
}

export class PautaFiltro {
    habilitado?: string;
    pagina = 0;
    intensPorPagina = 20;
}

export class AssociadoResponse {
    content?: Associado[]; 
    totalElements?: number;
}

export class PautaResponse {
    content?: Pauta[]; 
    totalElements?: number;
}