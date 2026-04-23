export interface ApiErrorBody {
  error: string;
  details?: unknown;
}

export interface ApiSuccess<T> {
  data: T;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
