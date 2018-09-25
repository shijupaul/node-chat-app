var isRealString = (stringValue) => {
  return typeof stringValue === 'string' && stringValue.trim().length > 0;
}

module.exports = {isRealString}
