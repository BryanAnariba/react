import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    // console.log({token})
    // Si el token no es proveeido
    if (!token) {
      throw new HttpException('Token Not Found.', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Llamamos al servicio para ver si el token es valido, si lo es retorna el token nuevo y usuario logueado, dichos parametros los vuelve a meter al header
      const { user, token: newToken } = await this.authService.verifyToken(token);
      req['user'] = user;
      req['token'] = newToken;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Error: ${error}`, HttpStatus.UNAUTHORIZED);
    }

    //  Si no entro al catch retorna true, todo ok!, no hay errores
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}