  export class AuthTokenError extends Error{
    constructor(){
      super("Erro no token de autenticação")
    }
  }