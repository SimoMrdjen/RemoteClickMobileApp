import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import io, { Socket } from 'socket.io-client';

// Define the types for state management
export default function App() {
  const [status, setStatus] = useState<string>('Disconnected');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server (your Heroku app)
    const socketConnection = io('https://micic-fc43cdd8f709.herokuapp.com');

    socketConnection.on('connect', () => {
      setStatus('Connected to WebSocket server');
    });

    socketConnection.on('disconnect', () => {
      setStatus('Disconnected from WebSocket server');
    });

    setSocket(socketConnection);

    // Cleanup connection on unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const triggerClick = () => {
    if (socket) {
      socket.emit('click');
      Alert.alert('Click Event', 'Click event sent to server!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <Button title="Trigger Click" onPress={triggerClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
  },
});
