const expect = require('expect')
const {isRealString} = require('./validation');

describe('testing validation.js', () => {
  it('isRealString() should return true for a valid string', () => {
    expect(isRealString('hello')).toBe(true);
  })
  it('isRealString() should return false for a number', () => {
    expect(isRealString(1234)).toBe(false);
  })
  it('isRealString() should return false for an empty string', () => {
    expect(isRealString('   ')).toBe(false);
  })
})
