export interface Pagination {
  skip?: number;
  take?: number;
  perPage?: number;
  page?: number;
  totalPages?: number;
  search?: string;
  currentpage?: string;
}
