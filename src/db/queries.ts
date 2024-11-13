export const GET_DATA_QUERY = (
  columns: string,
  table: string,
  limit?: number
) => {
  return `SELECT ${columns} FROM ${table} ${limit ? "LIMIT $1" : ""}`;
};

export const GET_COLUMNS_META_QUERY = (selectedColumns: string[]) => {
  let queryText = `
      SELECT column_name AS name, data_type AS type, is_nullable = 'YES' AS nullable
      FROM information_schema.columns
      WHERE table_name = $1 AND table_schema = 'public'
    `;

  if (selectedColumns.length > 0) {
    const placeholders = selectedColumns.map((_, i) => `$${i + 2}`).join(", ");
    queryText += ` AND column_name IN (${placeholders})`;
  }

  queryText += " ORDER BY ordinal_position;";
  return queryText;
};

export const GET_TABLES_AND_COLUMNS_QUERY = `
  SELECT table_name, column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public'
  ORDER BY table_name, ordinal_position;
`;
