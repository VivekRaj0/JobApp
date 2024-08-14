import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobCard from '../components/JobCard';

export default function BookmarksScreen({ navigation }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        if (bookmarks) {
          setBookmarkedJobs(JSON.parse(bookmarks));
        }
      } catch (err) {
        console.error('Failed to fetch bookmarks', err);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchBookmarks);

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={bookmarkedJobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
          <JobCard job={item} />
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarked jobs.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
});
