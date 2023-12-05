'use client'
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newUserInput, setNewUserInput] = useState('');
  const [chatIsLoading, setChatIsLoading] = useState(false);

  const handleChatEnter = (event) => {
    if (event.key === "Enter") { handleSendMessage() }
  }

  const handleClearChat = (event) => {
    setMessages([]);
  }

  const handleSendMessage = async () => {

    if (newUserInput.trim() === '' || chatIsLoading) return;
    setMessages([...messages, { text: newUserInput, sender: 'User' }]);
    setNewUserInput('');
    setChatIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newMessage: newUserInput })
    }

    //fetch url
    const url = '/api/chat';

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMessages((prevState) => [...prevState, { text: data.content, sender: 'Openai' }]);
      setChatIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.title}>Generate acceptance criteria</div>
      <p className={styles.description}>Generate acceptance criteria of the application using a prompt</p>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={`message${message.sender}`}>
            {message.text}
          </div>
        ))}
        {chatIsLoading && (
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.chatPrompt}>
          <textarea
            id="user-input"
            className={styles.userInput}
            placeholder={chatIsLoading ? "Thinking" : "Please enter your text..."}
            value={newUserInput}
            onChange={(e) => setNewUserInput(e.target.value)}
            onKeyDown={handleChatEnter}
          ></textarea>
        </div>
      </div>
      <div className={styles.chatControls}>
        <button
          className={styles.primaryButton}
          disabled={chatIsLoading}
          onClick={handleSendMessage}
        >
          Generate
        </button>
        <button className={styles.primaryButton} onClick={handleClearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};
export default ChatPage;