import DbConnector from "../db/DbConnector";
import QueryDispatcher from "../db/QueryDispatcher";

class QueryValidator {
  private static instance: QueryValidator;

  private constructor() {}

  public static getInstance(): QueryValidator {
    if (!QueryValidator.instance) {
      QueryValidator.instance = new QueryValidator();
    }
    return QueryValidator.instance;
  }

  private async getTablesAndColumns() {
    const query = QueryDispatcher.getTablesAndColumnsQuery();
    const db = DbConnector.getInstance();

    const result = await db.query(query);

    const tables = result.rows.reduce((acc: any, row: any) => {
      if (!acc[row.table_name]) {
        acc[row.table_name] = [];
      }
      acc[row.table_name].push(row.column_name);
      return acc;
    }, {});

    return tables;
  }

  public async validate(params: { table: string; columns: string }) {
    const { table, columns = "*" } = params;

    const tables = await this.getTablesAndColumns();

    if (!tables[table]) {
      throw new Error(`Table ${table} does not exist`);
    }

    const columnList = columns === "*" ? tables[table] : columns.split(",");

    columnList.forEach((column: string) => {
      if (!tables[table].includes(column)) {
        throw new Error(`Column ${column} does not exist in table ${table}`);
      }
    });

    return true;
  }
}

export default QueryValidator;
