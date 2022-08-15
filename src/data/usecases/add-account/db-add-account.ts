import { AccountModel, AddAccount, AddAccountModel, Hasher } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccount) { }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassord = await this.hasher.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassord }))
    return account
  }
}
