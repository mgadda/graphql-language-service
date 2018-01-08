import {getTokenAtPosition, getTypeInfo} from './getAutocompleteSuggestions';

export function getTypeInformation(
  schema: GraphQLSchema,
  queryText: string,
  cursor: Position,
  contextToken?: ContextToken,
): string {
  const token = contextToken || getTokenAtPosition(queryText, cursor);
  const typeInfo = getTypeInfo(schema, token.state);

  const res = typeInfo;
  return `
[GraphQL]
\`\`\`json
${JSON.stringify(res, null, 2)}
\`\`\`
  `;
}
