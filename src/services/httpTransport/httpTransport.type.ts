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

// я не нашел как сделать Required<IRequestOptions> для определенного свойства
// гугл сказал сделать так
interface IRequestOptionsWithMethod extends IRequestOptions {
  method: METHODS
}

export { METHODS, IRequestOptions, IRequestOptionsWithMethod }