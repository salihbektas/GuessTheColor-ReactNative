import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  
  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }
  
  const [color, setColor] = useState(randomColorGenerator())
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height: "25%", width: "70%", backgroundColor: color, borderRadius: 16}} />
      

      <View style={{borderWidth:1, padding: 4}}>
        <Text>field of choices</Text>
      </View>

      <View style={{borderWidth:1, padding: 4}}>
        <Text>result feedback area</Text>
      </View>

      <Pressable style={{borderWidth:1, padding: 4}}>
        <Text>next question button</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
