import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import JobCard from '../components/JobCard';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://your-api-url.com/jobs?page=${page}`);
      setJobs([...jobs, ...response.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const loadMoreJobs = () => {
    setPage(page + 1);
  };

  if (loading && page === 1) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching jobs: {error.message}</Text>
      </View>
    );
  }

  if (jobs.length === 0 && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No jobs found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
          <JobCard job={item} />
        </TouchableOpacity>
      )}
      onEndReached={loadMoreJobs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
  );
}
