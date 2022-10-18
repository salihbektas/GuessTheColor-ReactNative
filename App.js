import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [choices, setChoices] = useState([
    {color:"#", order:0},{color:"#", order:1},{color:"#", order:2}
  ])

  const [feedback, setFeedback] = useState("")

  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return {r, g, b};
  }

  function generateChoices(){
    let answer = { color: "", order: null, isCorrect: true}
    let fake1 = { color: "", order: null, isCorrect: false}
    let fake2 = { color: "", order: null, isCorrect: false}

    let {r, g, b} = randomColorGenerator()
    let index = Math.floor(Math.random() * 3)

    let color = "#";

    [r,g,b].map(value => {
      if(value < 16)
        color += "0"

      color += value.toString(16)
    })

    answer.color = color
    answer.order = index

    fake1.order = (index+1) % 3
    fake2.order = (index+2) % 3
    
    
    for(let i = 0; i < 2; ++i){

      let color = "#";

      [r,g,b].map(value => {
        let min = value-100 >= 0 ? value-100 : 0
        let max = value+100 <= 255 ? value+100 : 255


        let fakeColor = Math.floor(Math.random() * (max - min)) + min

        if(fakeColor < 16)
          color += "0"
        
        color += fakeColor.toString(16)
      })

      if(i === 0)
        fake1.color = color
      
      else
        fake2.color = color
    }

    setChoices([answer, fake1, fake2])

  }

  function onPressAnswer(buttonOrder){

    if(choices.find(item => item.order ===buttonOrder).isCorrect)
      setFeedback("Correct")
    else 
      setFeedback("Wrong")
  }

  function onPressNext(){
    setFeedback("")
    generateChoices()
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
      <View style={{flex:4, alignItems: 'center', justifyContent: 'space-around', width: "100%"}} >
        <View style={{height: "25%", width: "70%", borderRadius: 15, borderWidth:1, backgroundColor: choices[0].color}} />
        

        <View style={{flexDirection: "row", justifyContent: "space-evenly", width: "100%"}}>
          <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPressAnswer(0)}>
            <Text>{choices.find(item => item.order === 0).color}</Text>
          </Pressable>

          <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPressAnswer(1)}>
            <Text>{choices.find(item => item?.order === 1).color}</Text>
          </Pressable>

          <Pressable style={{backgroundColor:"lightgrey", padding: 8}} onPress={() => onPressAnswer(2)}>
            <Text>{choices.find(item => item.order === 2).color}</Text>
          </Pressable>
        </View>

        <View>
          <Text>{feedback}</Text>
        </View>
      </View>
      <View style={{flex:1}}>
        {feedback && (
          <Pressable style={{borderWidth:1, padding: 4}} onPress={onPressNext}>
            <Text>next question</Text>
          </Pressable>
        )}
      </View>


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
