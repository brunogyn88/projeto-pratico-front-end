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
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesap;
  listaCartaz: any | null;
  ocoId: number;
}

export interface OcorrenciaEntrevDesap {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface FiltroPessoasDesaparecidas {
  nome: string;
  faixaIdadeInicial: number;
  faixaIdadeFinal: number;
  pagina: number;
  porPagina: number;
}

export interface PaginatedResponse<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
