import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../localization/i18n'; // pontos útvonal!

export default function ProfileScreen({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('profile')}</Text>
      {user && user.email ? (
        <Text style={styles.email}>
          {i18n.t('loggedInAs')} {user.email}
        </Text>
      ) : (
        <Text style={styles.email}>{i18n.t('notLoggedIn')}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, marginTop: 10 },
});
