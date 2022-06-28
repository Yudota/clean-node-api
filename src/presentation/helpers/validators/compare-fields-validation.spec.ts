import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'field_to_compare')
}
describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if compare fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', field_to_compare: 'other_value' })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })
  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', field_to_compare: 'any_name' })
    expect(error).toBeFalsy()
  })
})
