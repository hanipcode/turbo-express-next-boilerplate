const HTTP_CODES = {
  SUCCESS: 200,
  BODY_ERROR: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export default HTTP_CODES;