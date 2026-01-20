import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]



export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar'/>
        <Button title="Adicionar" activeOpacity={0.8} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status)=>(
              <Filter key={status} status={status} isActive/>
            ))
          }

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>

          {Array.from({length: 50}).map((value, index)=>(
            <Item 
            key={index}
            data={{status: FilterStatus.DONE, description: "café"}}
            onStatus={() => console.log("Alterna Status do index "+ index)}
            onRemove={() => console.log("remover o index " + index)}
            
            />
          ))}
        </ScrollView>
      </View>

      
    </View>
  );
}


