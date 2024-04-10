import styles from './ChatList.module.scss';

interface ChatListProps {
  messages: string[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <div className={styles.chatHistory}>
      {messages.filter(Boolean).map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${index % 2 === 0 ? styles.sent : styles.received}`}
        >
          <div
            className={styles.messageSender}
            style={index % 2 === 0 ? { textAlign: 'right' } : { textAlign: 'left' }}
          >
            {index % 2 === 0 ? '我' : '机器人'}
          </div>
          <div className={styles.messageText}>{message}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
