import jwt from 'jsonwebtoken'

export function createActivationToken(payload: object) {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET!, { expiresIn: '15m' })
}

export function verifyActivationToken(token: string) {
  return jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET!)
}
