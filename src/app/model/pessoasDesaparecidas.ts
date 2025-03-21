export interface PessoaDesaparecida {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz: any | null;
  ocoId: number;
}

export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}
