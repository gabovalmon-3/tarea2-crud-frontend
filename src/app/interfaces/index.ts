// Autenticación

export interface ILoginResponse {
  token: string;
  tipo: string;
  username: string;
  roles: string[];
}

export enum IRoleType {
  user = 'USER',
  superAdmin = 'SUPER-ADMIN-ROLE'
}

// Entidades

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  activo?: boolean;
  roles?: string[];
}

export interface ICategoria {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

export interface IProducto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  cantidadStock?: number;
  categoria?: ICategoria;
}

// Respuestas del backend

export interface IResponse<T> {
  message: string;
  data: T;
  meta: ISearch;
}

export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

// Mensajes de interfaz

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = 'SUCCESS',
  error = 'ERROR',
  default = ''
}