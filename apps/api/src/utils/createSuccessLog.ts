export const createSuccessLog = (
  serviceName: string,
  servicePath: string,
  data: any,
) =>
  JSON.stringify({
    path: `/${serviceName}/${servicePath.replace(/^\//, "")}`,
    serviceName,
    servicePath,
    data,
  });
