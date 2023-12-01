async function callChatAPI(newMessage){

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
                        content: `You are a Product manager,
                   You have been doing this task for 20 years, 
                   Your task is to generate as many acceptance criteria statements as you can for the following application: ${newMessage}
                   `
                    }],
                max_tokens: 1000, // Adjust based on your needs
            }),
        });
        const data = await response.json();
        return data.choices[0].message.content;
}

async function mockCallChatAPI(newMessage){

        return 'this is a mock ' + newMessage;
}


export default async function handler(req, res) {
    const newMessage = req.body.newMessage;
    let chatResponse = ''

    if (newMessage.trim() === '') {
        res.status(200).send('message was empty');
    };

    try {
        chatResponse = await mockCallChatAPI(newMessage)
    } catch (error) {
        console.log(error);
        res.status(500).send({});
    }
    res.status(200).send({content: chatResponse});

}


