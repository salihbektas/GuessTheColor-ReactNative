import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [choices, setChoices] = useState([
    {color:"#", order:0},{color:"#", order:1},{color:"#", order:2}
  ])


  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return {r, g, b};
  }

  function generateChoices(){
    let {r, g, b} = randomColorGenerator()
    let index = Math.floor(Math.random() * 3)

    let color = "#";

    [r,g,b].map(value => {
      if(value < 16)
        color += "0"

      color += value.toString(16)
    })

    let newChices = [...choices];
    newChices[0] = {color: color, order: index}
    newChices[index].order = 0

    for(let index = 1; index < 3; ++index){

      [r,g,b].map(value => {
        let min = value-100 >= 0 ? value-100 : 0
        let max = value+100 <= 255 ? value+100 : 255

        
        let color = Math.floor(Math.random() * (max - min)) + min

        if(color < 16)
          newChices[index].color += "0"
        
        newChices[index].color += color.toString(16)
      })
    }



    //let color1 = Math.floor(Math.random() * (max - min)) + min
    //console.log(r)
    //console.log(color1)

    setChoices(newChices)

  }

  useEffect(()=>
    console.log(choices)
  ,[choices])

  useEffect(()=> {
    generateChoices()
  },[])
  
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height: "25%", width: "70%", borderRadius: 15, borderWidth:1, backgroundColor: choices[0].color}} />
      

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
