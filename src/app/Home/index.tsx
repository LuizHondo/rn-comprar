import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';



export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar'/>
        <Button title="Entrar" activeOpacity={0.8} />
      </View>
      <View style={styles.content}>
        <Filter status={FilterStatus.DONE} isActive/>
        <Filter status={FilterStatus.PENDING} isActive/>

      </View>
    </View>
  );
}


