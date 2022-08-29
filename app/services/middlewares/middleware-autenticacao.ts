import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function MiddlewareAutenticacao(request: Request, response: Response, next: NextFunction) {
  const bearer_token = request.headers.authorization;
  
  if (!bearer_token) {
    return response.status(401).json({Error: "Token inválido"});
  }
  
  const [, token] = bearer_token.split(" ");
  
  try {
    const {sub} = verify(token, "ifce") as IPayload;
    request.id_usuario = sub;
    return next();
  } catch (error) {
    return response.status(401).json({ Error: "Token expirado" });
  }
}