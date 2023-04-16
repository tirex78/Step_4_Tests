declare const mockedJwtService: {
    signAsync: () => {
        sub: number;
        type: string;
    };
};
export default mockedJwtService;
