import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ActivityTestScreen() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('activityScore', 'desc'));
        const snap = await getDocs(q);
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        console.log('getDocs result', arr);
        setUsers(arr);
      } catch (err) {
        console.error('getDocs error', err);
        setError(err);
      }
    })();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Activity test</Text>
      {error ? <Text style={{ color: 'red' }}>Error: {error.message || String(error)}</Text> : null}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name} — {item.activityScore}</Text>}
      />
    </View>
  );
}
