import {
  getTokenAtPosition
} from './getAutocompleteSuggestions';

export function getTypeInformation(
  schema: GraphQLSchema,
  queryText: string,
  cursor: Position,
  contextToken?: ContextToken,
): string {
  const token = contextToken || getTokenAtPosition(queryText, cursor);
  return `
\`\`\`json
${JSON.stringify(token, null, 2)}
\`\`\`
  `;
}
