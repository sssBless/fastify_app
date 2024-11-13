export const dataQuerySchema = {
  type: "object",
  properties: {
    table: {
      type: "string",
      pattern: "^[a-zA-Z_]+$",
      description: "Название таблицы, обязательный параметр",
    },
    columns: {
      type: "string",
      pattern: "^(\\*|[a-zA-Z0-9_,]+)$", // Разрешаем значение "*" или список колонок
      default: "*",
      description: "Список названий колонок через запятую, по умолчанию все",
    },
    limit: {
      oneOf: [
        { type: "integer", minimum: 1 },
        { type: "string", const: "false" },
      ],
      default: 100,
      description:
        "Число или 'false', ограничивает количество записей, по умолчанию 100",
    },
  },
  required: ["table"],
  additionalProperties: false,
};
