import {
  GET_DATA_QUERY,
  GET_COLUMNS_META_QUERY,
  GET_TABLES_AND_COLUMNS_QUERY,
} from "./queries";

class QueryDispatcher {
  public static getDataQuery(columns: string, table: string, limit?: number) {
    return GET_DATA_QUERY(columns, table, limit);
  }

  public static getColumnsMetaQuery(selectedColumns: string[]) {
    return GET_COLUMNS_META_QUERY(selectedColumns);
  }

  public static getTablesAndColumnsQuery() {
    return GET_TABLES_AND_COLUMNS_QUERY;
  }
}

export default QueryDispatcher;
