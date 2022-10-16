import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [choices, setChoices] = useState([
    {color:"#", order:0},{color:"#", order:1},{color:"#", order:2}
  ])

  const [isResultState, setIsResultState] = useState(false)
  const [feedback, setFeedback] = useState("")

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

    let newChoices = [...choices];
    newChoices[0] = {color: color, order: index}
    newChoices[index].order = 0

    for(let index = 1; index < 3; ++index){

      let color = "#";

      [r,g,b].map(value => {
        let min = value-100 >= 0 ? value-100 : 0
        let max = value+100 <= 255 ? value+100 : 255


        let fakeColor = Math.floor(Math.random() * (max - min)) + min

        if(fakeColor < 16)
          color += "0"
        
        color += fakeColor.toString(16)
      })

      newChoices[index].color = color
    }

    setChoices(newChoices)

  }

  function onPress(buttonOrder){
    console.log(buttonOrder)
    if(buttonOrder === 0)
      setFeedback("Correct")
    else 
      setFeedback("Wrong")
  }

  //bunu sil
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
      

      <View style={{flexDirection: "row", justifyContent: "space-evenly", width: "100%"}}>
        <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPress(0)}>
          <Text>{choices.find(item => item.order === 0).color}</Text>
        </Pressable>

        <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPress(1)}>
          <Text>{choices.find(item => item.order === 1).color}</Text>
        </Pressable>

        <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPress(2)}>
          <Text>{choices.find(item => item.order === 2).color}</Text>
        </Pressable>
      </View>

      <View>
        <Text>{feedback}</Text>
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
