const generateAIMessage = require('../../lib/message');

async function callChatAPI(newMessage, nonFunctional) {

    const openAIKey = process.env.OPENAI_KEY;

    let messageToAI = generateAIMessage();
    

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:
                [{
                    role: "user",
                    content: messageToAI
                }],
            max_tokens: 1000,
        }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

async function mockCallChatAPI(newMessage, nonFunctional) {

    await new Promise(resolve => setTimeout(resolve, 3000));
    return 'this is a mock: \n' + generateAIMessage(newMessage, nonFunctional);
}


export default async function handler(req, res) {
    const newMessage = req.body.newMessage;
    const nonFunctional = req.body.nonFunctional;
    let chatResponse = ''

    if (newMessage.trim() === '') {
        res.status(200).send('message was empty');
    };

    try {
        chatResponse = await mockCallChatAPI(newMessage, nonFunctional)
    } catch (error) {
        console.log(error);
        res.status(500).send({});
    }
    res.status(200).send({ content: chatResponse });

}


