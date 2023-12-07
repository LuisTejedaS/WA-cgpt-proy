const generateAIMessage = require('../lib/message');

test('should generate no functional criteria and calculator message', () => {

    let message = `You are a Product manager,
    You have been doing this task for 20 years, 
    Your task is to generate as many acceptance criteria statements as you can for the following application: calculator. 
    `
  expect(generateAIMessage('calculator', false)).toBe(message);
});

test('should generate functional criteria and calculator message', () => {

    let message = `You are a Product manager,
    You have been doing this task for 20 years, 
    Your task is to generate as many acceptance criteria statements as you can for the following application: calculator. 
    Please, also add non-functional acceptance criteria and separate the functional of the non-functional`
  expect(generateAIMessage('calculator', true)).toBe(message);
});