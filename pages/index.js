'use client'
import { useState } from 'react';
// import styles from '../styles/chat.styles.css'
import styles from '../styles/Home.module.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatIsLoading, setChatIsLoading] = useState(false);

  const handleChatEnter = (event) => {
    if (event.key === "Enter") { handleSendMessage() }
  }

  const handleClearChat = (event) => {
    setMessages([]);
  }

  const handleSendMessage = async () => {

    if (newMessage.trim() === '' || chatIsLoading) return;
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    setChatIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newMessage })
    }

    //fetch url
    const url = '/api/chat';

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMessages((prevState) => [...prevState, { text: data.content, sender: 'openai' }]);
      setChatIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {chatIsLoading && (
          <div className={styles.laoder}>
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
            placeholder={chatIsLoading ? "Thinking" : "Please enter your text..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleChatEnter}
          ></textarea>
        </div>
      </div>
      <div className={styles.chatInput}>
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