

export function testes(testFunction: Function) {
    if (process.env.NODE_ENV === 'test') {
        testFunction();
    }
}