/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectQueryBuilder } from 'typeorm';

const applyFilter = (
  query: SelectQueryBuilder<any>,
  modelAlias: string,
  filters: any
) => {
  if (filters) {
    query.andWhere(`${modelAlias}.email = :email`, { email: filters });
  }
  // Add more filter conditions here if needed
};

const applySorting = (
  query: SelectQueryBuilder<any>,
  sortBy: string,
  sortOrder?: 'ASC' | 'DESC'
): void => {
  if (sortBy) {
    query.orderBy(sortBy, sortOrder || 'ASC');
  }
};

const applyPaging = (
  query: SelectQueryBuilder<any>,
  page: number,
  pageSize: number
): void => {
  const offset = (page - 1) * pageSize;
  query.skip(offset).take(pageSize);
};

const applyFieldSelection = (
  query: SelectQueryBuilder<any>,
  modelAlias: string,
  fields: string
): void => {
  if (fields) {
    const selectFields = fields.split(',');
    query.select(`${modelAlias}.${selectFields}`);
  }
};

export { applyFieldSelection, applyFilter, applyPaging, applySorting };
