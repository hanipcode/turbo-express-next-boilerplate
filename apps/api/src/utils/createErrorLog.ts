export const createErrorLog = (
  serviceName: string,
  servicePath: string,
  errorObject: Error,
  additionalData?: any,
) => ({
  path: `/${serviceName}/${servicePath.replace(/^\//, "")}`,
  serviceName,
  servicePath,
  errorObject,
  additionalData,
});
