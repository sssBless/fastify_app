export const dataQuerySchema = {
  type: "object",
  properties: {
    table: {
      type: "string",
      pattern: "^[a-zA-Z_]+$",
      description: "Table name, required parameter",
    },
    columns: {
      type: "string",
      pattern: "^(\\*|[a-zA-Z0-9_,]+)$",
      default: "*",
      description: "List of column names separated by commas, defaults to all",
    },
    limit: {
      oneOf: [
        { type: "integer", minimum: 1 },
        { type: "string", const: "false" },
      ],
      default: 100,
      description:
        "Number or 'false', limits the number of entries, defaults to 100",
    },
  },
  required: ["table"],
  additionalProperties: false,
};
