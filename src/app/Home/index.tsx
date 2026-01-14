import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';



export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <StatusBar style="auto" />

      <Button title="Entrar" activeOpacity={0.8} />
    </View>
  );
}


