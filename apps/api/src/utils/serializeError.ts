export const serializeError = (err: Error) =>
  JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
