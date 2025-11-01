import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatScreen({ route }) {
  const chatId = route?.params?.chatId ?? 'demo';
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(docs.reverse());
    }, (err) => {
      console.warn('Chat onSnapshot err', err);
    });
    return () => unsub();
  }, [chatId]);

  const send = async () => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: trimmed,
        sender: 'web-demo',
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (e) {
      console.warn('Send err', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.msgRow}>
      <View style={styles.msgBubble}>
        <Text style={styles.msgSender}>{item.sender}</Text>
        <Text style={styles.msgText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        inverted={false}
        contentContainerStyle={{ padding: 12 }}
      />

      <View style={styles.composer}>
        <TextInput
          placeholder="Írj üzenetet..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={send}
        />
        <Pressable style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendTxt}>Küld</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  msgRow: { marginVertical: 6 },
  msgBubble: { backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10, maxWidth: '85%' },
  msgSender: { fontSize: 11, fontWeight: '700', color: '#666', marginBottom: 4 },
  msgText: { fontSize: 15, color: '#222' },
  composer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
  input: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#fafafa', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  sendBtn: { marginLeft: 8, backgroundColor: '#1E88E5', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  sendTxt: { color: '#fff', fontWeight: '900' },
});
