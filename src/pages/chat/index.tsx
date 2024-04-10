import { useChat } from '@/api/chat';
import ChatList from '@/components/chat/ChatList';
import { Button, Loading, SearchBar } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.scss';

const ChatPage = () => {
  const { data, params, runAsync, loading } = useChat();
  const [word, setWord] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    if (!word) return;
    setChatHistory([...chatHistory, { role: 'user', content: word }]);
    setWord('');
    const res = await runAsync({
      messages: [...chatHistory, { role: 'user', content: word }],
      system: '你是一个教授青少年编程的老师，请回答学生一些问题'
    });
    //chatHistory.current.push({ role: 'assistant', content: res.result });
    setChatHistory([
      ...chatHistory,
      { role: 'user', content: word },
      { role: 'assistant', content: res.result }
    ]);
  };
  return (
    <View className={styles.container}>
      <View className={styles.topHeader}>
        <span>{'问答机器人'}</span>
        {loading && <Loading style={{ marginLeft: 10 }}>机器人正在码字中</Loading>}
      </View>
      <View className={styles.content}>
        <ChatList messages={chatHistory.filter(Boolean).map((item) => item.content)} />
      </View>
      <View className={styles.foot}>
        <SearchBar
          right={
            <Button type={'primary'} onClick={handleSend}>
              发送
            </Button>
          }
          className={styles.input}
          value={word}
          onChange={(val) => setWord(val)}
        />
      </View>
    </View>
  );
};

export default ChatPage;
