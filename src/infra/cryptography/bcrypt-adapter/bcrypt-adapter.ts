import { Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
