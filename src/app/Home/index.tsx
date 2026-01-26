import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { Item } from '@/components/Item';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { ItemStorage, ItemsStorage } from '@/storage/itemsStorage';


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
// const ITEMS = Array.from({length: 50}).map((value, index) => String(index));
// const ITEMS = [
  //   {id: "1", status: FilterStatus.DONE, description: "banana"},
//   {id: "2", status: FilterStatus.DONE, description: "alicate"},
//   {id: "3", status: FilterStatus.PENDING, description: "guaraná"},
//   {id: "4", status: FilterStatus.DONE, description: "Tijolo"},
//   {id: "5", status: FilterStatus.DONE, description: "banana"},
//   {id: "6", status: FilterStatus.DONE, description: "alicate"},
//   {id: "7", status: FilterStatus.PENDING, description: "guaraná"},
//   {id: "8", status: FilterStatus.DONE, description: "Tijolo"},
// ]


export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])


  function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Add","Inform the requested item name")
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
    setItems([...items, newItem])
  }

  async function getItems(){
    try{
      const response = await ItemsStorage.get()
      console.log(response)
    }
    catch(error){
      console.log(error)
      Alert.alert("Error", "Unable to filter items")
    }
  }



  useEffect(() => {
      getItems()
  }, [filter])


  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
         placeholder='O que você precisa comprar?'
         onChangeText={setDescription}
        />
        <Button title="Adicionar" activeOpacity={0.8} onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status)=>(
              <Filter 
              key={status} 
              status={status} 
              isActive={status === filter}
              onPress={()=> setFilter(status)}
              />
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
          data={items} 
          keyExtractor={item => item.id} 
          renderItem={({item})=>(
              <Item 
                data={item}
                onStatus={() => console.log("Alterna Status do index ")}
                onRemove={() => console.log("remover o index " )}
              
              />
            )
          }
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=> <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={()=> <Text style={styles.empty}>Nenhum item</Text>}
        />
      </View>

      
    </View>
  );
}


