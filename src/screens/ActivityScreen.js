import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ActivityScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('activityScore', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(arr);
    }, (err) => {
      console.warn('Activity onSnapshot err', err);
    });
    return () => unsub();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name ?? item.id}</Text>
        <Text style={styles.sub}>{item.lastOrder ? `Utolsó: ${item.lastOrder}` : ''}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={{ color: '#fff', fontWeight: '900' }}>{item.activityScore ?? 0}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity scoreboard</Text>
      <FlatList data={users} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={{ padding: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontWeight: '900', fontSize: 18, color: '#B31515', padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  name: { fontWeight: '800' },
  sub: { color: '#666', marginTop: 4, fontSize: 12 },
  badge: { backgroundColor: '#1E88E5', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 }
});
