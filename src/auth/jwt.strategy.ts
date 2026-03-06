import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

   constructor() {

    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })

  }

  async validate(payload: any) {

  return {
    userId: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
    role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  }

}
}