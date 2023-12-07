function generateAIMessage(newMessage, nonFunctional){
    let messageToAI = `You are a Product manager,
    You have been doing this task for 20 years, 
    Your task is to generate as many acceptance criteria statements as you can for the following application: ${newMessage}. 
    `

    if(nonFunctional){
        messageToAI = messageToAI + 'Please, also add non-functional acceptance criteria and separate the functional of the non-functional';
    }
    return messageToAI;
}

module.exports = generateAIMessage