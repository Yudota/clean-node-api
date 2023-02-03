import { AccountModel, AddAccount, AddAccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccount,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassord = await this.hasher.encrypt(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassord }))
      return newAccount
    }
    return null
  }
}
