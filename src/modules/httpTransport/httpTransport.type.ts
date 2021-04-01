enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

interface IRequestOptions {
  headers?: {
    name: string,
    value: string
  },
  data?: any,
  timeout?: number
}
interface IRequestOptionsWithMethod extends IRequestOptions {
  method: METHODS
}

export {METHODS, IRequestOptions, IRequestOptionsWithMethod};
