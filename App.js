import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firestore } from './firebase/Config';

const TODOS = 'todos'; 

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, TODOS), (snapshot) => {
      const fetchedTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, []);

  const save = async () => {
    if (newTodo.trim()) {
      await addDoc(collection(firestore, TODOS), {
        text: newTodo.trim()
      });
      setNewTodo('');
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestore, TODOS, id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Shopping List</Text>
      <View style={styles.form}>
        <TextInput
          placeholder='Add item'
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
          style={styles.input}
        />
        <Button
          title="Save"
          onPress={save}
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: '100%',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
});
