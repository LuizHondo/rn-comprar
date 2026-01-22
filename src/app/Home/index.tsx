import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
// const ITEMS = Array.from({length: 50}).map((value, index) => String(index));
const ITEMS = [
  {id: "1", status: FilterStatus.DONE, description: "banana"},
  {id: "2", status: FilterStatus.DONE, description: "alicate"},
  {id: "3", status: FilterStatus.PENDING, description: "guaraná"},
  {id: "4", status: FilterStatus.DONE, description: "Tijolo"},
]


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




          {/* {ITEMS.map((value)=>(
            <Item 
              key={value}
              data={{status: FilterStatus.DONE, description: String(value)}}
              onStatus={() => console.log("Alterna Status do index ")}
              onRemove={() => console.log("remover o index " )}
            
            />
          ))} */}
        <FlatList 
          data={ITEMS} 
          keyExtractor={item => item.id} 
          renderItem={({item})=>(
              <Item 
                data={item}
                onStatus={() => console.log("Alterna Status do index ")}
                onRemove={() => console.log("remover o index " )}
              
              />
            )
          }
        />
      </View>

      
    </View>
  );
}


