const mockedJwtService = {
  signAsync: () => {
    return {
      sub: 1,
      type: 'Admin'
    }
  }
}

export default mockedJwtService;