import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The banana is a lie</Text>
      <StatusBar style="auto" />
    </View>
  );
}


