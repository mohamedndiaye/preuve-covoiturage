import { dateCast } from '../cast/dateCast';

const castStore = {
  date: dateCast,
};

export const castKeyword = {
  name: 'cast',
  type: 'keyword',
  definition: {
    modifying: true,
    errors: false,
    compile: (schema, parentSchema, it) => (data, dataPath, parentData, parentKey, rootData) => {
      if (schema in castStore) {
        parentData[parentKey] = castStore[schema]({
          schema,
          parentSchema,
          it,
          data,
          dataPath,
          parentData,
          parentKey,
          rootData,
        });
      }

      return true;
    },
    metaSchema: {
      type: 'string',
      enum: Reflect.ownKeys(castStore),
    },
  },
};