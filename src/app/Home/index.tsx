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


  async function handleAdd():Promise<void>{
    if(!description.trim()){
      return Alert.alert("Add","Inform the requested item name")
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
    await ItemsStorage.add(newItem)
    await itemsByStatus()

    setFilter(FilterStatus.PENDING)
    setDescription("")
    Alert.alert("Item added", `Added ${description}`)
  }

  async function itemsByStatus():Promise<void>{
    try{
      const response = await ItemsStorage.getByStatus(filter)
      setItems(response)
    }
    catch(error){
      console.log(error)
      Alert.alert("Error", "Unable to filter items")
    }
  }
  async function handleRemove(id:string):Promise<void> {
    try{
      await ItemsStorage.remove(id)
      await itemsByStatus()
    }
    catch(error){
      console.log(error)
      Alert.alert("Remove", "Unable to remove items")
    }
  }
  function handleClear(){
    Alert.alert("Clear","You sure you want to remove all items?",[
      {text:"Yes",onPress:onClear},
      {text:"No",style:"cancel"}
    ]
    )
  }

  async function onClear():Promise<void> {
    try{
      ItemsStorage.clear()
      setItems([])
    }
    catch(error){
      console.log(error)
      Alert.alert("Clear", "Unable to clear list")
    }
  }

  async function handleToggleItemStatus(id:string) {
    try{
      await ItemsStorage.toggleStatus(id)
      itemsByStatus()
    }
    catch(error){
      console.log(error)
      Alert.alert("Toggle Status", "Unable toggle item status")
    }
  }



  useEffect(() => {
      itemsByStatus()
  }, [filter])


  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
         placeholder='What do you need to buy?'
         onChangeText={setDescription}
         value={description}
        />
        <Button title="Add" activeOpacity={0.8} onPress={handleAdd} />
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

          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={items} 
          keyExtractor={item => item.id} 
          renderItem={({item})=>(
              <Item 
                data={item}
                onStatus={() => handleToggleItemStatus(item.id)}
                onRemove={()=>handleRemove(item.id)}
              
              />
            )
          }
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=> <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={()=> <Text style={styles.empty}>Empty list.</Text>}
        />
      </View>

      
    </View>
  );
}


