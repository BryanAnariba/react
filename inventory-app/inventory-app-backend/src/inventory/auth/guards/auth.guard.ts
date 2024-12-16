import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    // Si el token no es proveeido
    if (!token) {
      throw new HttpException('Token not found.', HttpStatus.UNAUTHORIZED);
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
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}