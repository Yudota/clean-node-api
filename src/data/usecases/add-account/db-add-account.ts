import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccount

  constructor (encrypter: Encrypter, addAccountRepository: AddAccount) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassord = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassord }))
    return await new Promise(resolve => resolve(null))
  }
}
