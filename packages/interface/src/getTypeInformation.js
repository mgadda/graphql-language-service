// @flow

import type { GraphQLSchema } from 'graphql';
import type { ContextToken } from 'graphql-language-service-types';
import type {Position} from 'graphql-language-service-utils';
import {print} from 'graphql/language/printer';
import {getTokenAtPosition, getTypeInfo} from './getAutocompleteSuggestions';

type MarkupContent = {
  kind: 'plaintext' | 'markdown',
  value: string
}

export function getTypeInformation(
  schema: GraphQLSchema,
  queryText: string,
  cursor: Position,
  contextToken?: ContextToken,
): string | MarkupContent | Array<MarkupContent> {
  const token = contextToken || getTokenAtPosition(queryText, cursor);
  const typeInfo = getTypeInfo(schema, token.state);
  const fieldDef = typeInfo ? typeInfo.fieldDef : null;

  if (!fieldDef) {
    return '';
  }

  let printedType = '';
  if (fieldDef) {
    printedType = print(fieldDef.astNode);
  }

  let fieldDescription = '';
  if (fieldDef) {
    fieldDescription = fieldDef.description || '';
  }

  let type = typeInfo.type;
  let typeDescription = '';
  if (type) {
    if (type.ofType) {
      type = type.ofType;
    }
    typeDescription = String(type.description || '');
  }

  return [
    {kind: 'markdown', value: `${printedType}\n\n${fieldDescription}`.trim()},
    {kind: 'markdown', value: typeDescription}
  ];

  // const {
  //   type,
  //   parentType
  // } = typeInfo;
  // const {name:fieldName = '', type:fieldType } = typeInfo.fieldDef || {}

  // if (!type) {
  //   return '';
  // }



  // let typeStr: string = `\`${type.name}\``;
  // if (parentType && fieldName) {
  //   typeStr = `${parentType.name}.${fieldName}: ${typeStr}`;
  // } else if (fieldName) {
  //   typeStr = `${fieldName}: ${typeStr}`;
  // }

  // return [
  //   {kind: 'markdown', value: typeStr},
  //   {kind: 'markdown', value: description},
  // ];
}
