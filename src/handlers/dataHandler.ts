import { FastifyReply, FastifyRequest } from "fastify";
import DbConnector from "../db/DbConnector";
import QueryValidator from "../validator/QueryValidator";
import QueryDispatcher from "../db/QueryDispatcher";

interface QueryParams {
  table: string;
  columns?: string;
  limit?: number | "false";
}

export const getDataHandler = async (
  request: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply
) => {
  const { table, columns = "*", limit = 100 } = request.query;

  const validator = QueryValidator.getInstance();

  if (!(await isValidQueryParams(validator, { table, columns }))) {
    return reply.code(400).send({ error: "Invalid query parameters" });
  }

  const selectedColumns = parseColumns(columns);
  const queryLimit = limit === "false" ? undefined : limit;

  try {
    const dataQueryText = QueryDispatcher.getDataQuery(
      selectedColumns.length > 0 ? selectedColumns.join(", ") : "*",
      table,
      queryLimit
    );

    const dataValues = queryLimit ? [queryLimit] : [];
    const dataResult = await fetchQueryResult(dataQueryText, dataValues);

    const columnMetaQueryText =
      QueryDispatcher.getColumnsMetaQuery(selectedColumns);

    const columnsResult = await fetchQueryResult(columnMetaQueryText, [
      table,
      ...selectedColumns,
    ]);

    const response = formatResponse(dataResult, columnsResult, selectedColumns);
    return reply.send(response);
  } catch (error) {
    console.error("Database query failed:", error);
    return reply.code(500).send({ error: "Database query failed" });
  }
};

const fetchQueryResult = async (queryText: string, queryValues: any[]) => {
  const db = DbConnector.getInstance();
  return await db.query(queryText, queryValues);
};

const formatResponse = (
  data: any,
  columnMeta: any,
  selectedColumns: string[]
) => {
  const columns = columnMeta.rows.map((row: any) => ({
    name: row.name,
    type: row.type,
    nullable: row.nullable,
  }));

  const rows = data.rows.map((row: any) =>
    selectedColumns.length > 0
      ? selectedColumns.map((col) => row[col])
      : Object.values(row)
  );

  return { columns, rows };
};
const isValidQueryParams = async (
  validator: QueryValidator,
  params: { table: string; columns: string }
) => {
  try {
    return await validator.validate(params);
  } catch (error) {
    console.error("Validation failed:", error);
    return false;
  }
};
const parseColumns = (columns: string): string[] => {
  return columns === "*" ? [] : columns.split(",").map((col) => col.trim());
};
