export const createSuccessResponse = (
  data: any,
  message: string = "Success Request",
  meta?: any,
) => ({
  error: false,
  data,
  message,
  meta,
});
