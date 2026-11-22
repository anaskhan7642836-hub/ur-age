
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [active, setActive] = useState(false);

  async function startCamera() {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setActive(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Ur Age?</Text>
      <Text style={styles.subtitle}>Discover how old you look!</Text>

      <View style={styles.camera}>
        {active ? (
          <CameraView style={StyleSheet.absoluteFill} facing="front" />
        ) : (
          <Text style={styles.placeholder}>📷{"\n"}Your camera will appear here</Text>
        )}
        {active && <View style={styles.frame} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={startCamera}>
        <Text style={styles.buttonText}>Start Live Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.stop} onPress={() => setActive(false)}>
        <Text style={styles.buttonText}>Stop Camera</Text>
      </TouchableOpacity>

      <Text style={styles.result}>✨ AI Age Estimate</Text>
      <Text style={styles.note}>
        Waiting for AI model integration. This starter version
        shows live camera only, not a real age prediction.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#17152e', alignItems: 'center', padding: 20 },
  logo: { color: 'white', fontSize: 38, fontWeight: 'bold', marginTop: 30 },
  subtitle: { color: '#c9bdff', marginBottom: 25 },
  camera: { width: '100%', height: 380, backgroundColor: '#29234d', borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  placeholder: { color: 'white', textAlign: 'center', fontSize: 18 },
  frame: { position: 'absolute', width: '65%', height: '70%', borderWidth: 2, borderColor: '#a99bff', borderRadius: 150 },
  button: { backgroundColor: '#7866df', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 20 },
  stop: { backgroundColor: '#40365f', padding: 14, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  result: { color: 'white', fontSize: 23, fontWeight: 'bold', marginTop: 25 },
  note: { color: '#c9bdff', textAlign: 'center', marginTop: 10, lineHeight: 20 }
});
