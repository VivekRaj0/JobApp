import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  const handleBookmark = async () => {
    try {
      let bookmarks = await AsyncStorage.getItem('bookmarks');
      bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
      bookmarks.push(job);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert('Job bookmarked!');
    } catch (err) {
      console.error('Failed to bookmark job', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.details}>Location: {job.location}</Text>
      <Text style={styles.details}>Salary: {job.salary}</Text>
      <Text style={styles.details}>Phone: {job.phone}</Text>
      <Text style={styles.details}>Description: {job.description}</Text>
      <Button title="Bookmark" onPress={handleBookmark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
});
