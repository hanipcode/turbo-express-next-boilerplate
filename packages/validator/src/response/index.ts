export interface TBackendResponse<Data = any, Meta = any> {
  message: string;
  error: false;
  data: Data;
  meta?: Meta;
}
