import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JobCard({ job }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.salary}>{job.salary}</Text>
      <Text style={styles.phone}>{job.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  salary: {
    fontSize: 14,
    color: '#777',
  },
  phone: {
    fontSize: 14,
    color: '#777',
  },
});
