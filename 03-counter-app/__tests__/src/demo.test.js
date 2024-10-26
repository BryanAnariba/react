describe('Test in demo.test.js', () => {
    test('This test should not to be failed.', () => {
       // 1. Arrange = Inicializacion
       const message = 'Hello world!';

       // 2. Act = Estimulo
        const messageTwo = message.trim();

       // 3. Assert = Observacion del comportamiento
       expect(message).toBe(messageTwo);
    });
});