const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
        return '3600'
      case 'JWT_REFRESH_TOKEN_EXPIRATION_TIME':
        return '7d'
      case 'JWT_ACCESS_TOKEN_SECRET':
        return 'sdhfisdhfisdhf9whef'
      case 'JWT_REFRESH_TOKEN_SECRET':
        return 'dsfklhafyh9w8fhosdhosh'
    }
  }
}

export default mockedConfigService;