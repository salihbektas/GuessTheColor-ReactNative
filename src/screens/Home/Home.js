import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../Colors";
import { useSettings, useSettingsDispatch } from "../../context/SettingContext";
import * as SplashScreen from 'expo-splash-screen';


export default function Home({ navigation }){
    const [choices, setChoices] = useState([
        {decimalColor:"", hexColor:"#", order:0},
        {decimalColor:"", hexColor:"#", order:1},
        {decimalColor:"", hexColor:"#", order:2}
      ])

      const [appIsReady, setAppIsReady] = useState(false)
    
      const [isPlaying, setIsPlaying] = useState(true)
      const [currentStreak, setCurrentStreak] = useState(0)
      const selected = useRef(null)
      const {isDarkMode : darkMode, colorCode, maxStreak} = useSettings()
      const dispatch = useSettingsDispatch()

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
    
        let hexColor = "#"
        let decimalColor = `${r},${g},${b}`;
    
        [r,g,b].map(value => {
          if(value < 16)
          hexColor += "0"
    
          hexColor += value.toString(16).toUpperCase()
        })
    
        answer.hexColor = hexColor
        answer.decimalColor = decimalColor
        answer.order = index
    
        fake1.order = (index+1) % 3
        fake2.order = (index+2) % 3
        
        
        for(let i = 0; i < 2; ++i){
    
          let hexColor = "#"
          let decimalColor = '';
    
          [r,g,b].forEach(value => {
            let min = value-100 >= 0 ? value-100 : 0
            let max = value+100 <= 255 ? value+100 : 255

            let fakeColor = Math.floor(Math.random() * (max - min)) + min
    
            if(fakeColor < 16)
              hexColor += "0"
            
            hexColor += fakeColor.toString(16).toUpperCase()
            decimalColor += fakeColor + ','
          })
    
          if(i === 0){
            fake1.hexColor = hexColor
            fake1.decimalColor = decimalColor.slice(0, -1) 
          }
          else{
            fake2.hexColor = hexColor
            fake2.decimalColor = decimalColor.slice(0, -1) 
          }
        }
    
        setChoices([answer, fake1, fake2])
    
      }
    
      function onPressAnswer(buttonOrder){
    
        if(isPlaying)
          setIsPlaying(false)
        else
          return
    
        selected.current = buttonOrder

        if(choices.findIndex(item => item.order === buttonOrder) === 0)
          setCurrentStreak(streak => streak+1)
        else
          setCurrentStreak(0)
    
      }
    
      function onPressNext(){
        setIsPlaying(true)
        selected.current = -1
        generateChoices()
      }
    
      useEffect(()=> {
        generateChoices()
      },[])

      useEffect(() => {
        if(currentStreak > maxStreak)
          dispatch({
            type: "setMaxStreak",
            maxStreak: currentStreak
          })
      }, [currentStreak])

      useEffect(() => {
        async function prepare() {
          try {
    
          } catch (e) {
            console.warn(e);
          } finally {
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);
    
    
      const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
      
      
      return (
        <SafeAreaView style={styles.container(darkMode)} onLayout={onLayoutRootView}>
          <StatusBar style={darkMode ? "light" : "dark"} />
          <View style={styles.mainSide} >
            <View style={styles.dashboard} >
              <Text style={styles.streak(darkMode)}>Streak: {currentStreak}</Text>
              <Pressable onPress={() => navigation.navigate('Settings')} >
                <Image source={require("../../../assets/setting.png")} style={styles.settings(darkMode)} />
              </Pressable>
            </View>
    
            <View style={styles.colorWindow(choices[0].hexColor, darkMode)} />
            
            <View style={styles.choicesArea}>
              <Pressable style={styles.choice(isPlaying, selected.current === 0, choices.findIndex(item => item.order === 0) === 0)} onPress={() => onPressAnswer(0)}>
                <Text style={styles.text}>
                  {colorCode === 'HEX' 
                    ? choices.find(item => item.order === 0).hexColor
                    : choices.find(item => item.order === 0).decimalColor
                  }
                </Text>
              </Pressable>
    
              <Pressable style={styles.choice(isPlaying, selected.current === 1, choices.findIndex(item => item.order === 1) === 0)} onPress={() => onPressAnswer(1)}>
                <Text style={styles.text}>
                  {colorCode === 'HEX' 
                    ? choices.find(item => item.order === 1).hexColor
                    : choices.find(item => item.order === 1).decimalColor
                  }
                </Text>
              </Pressable>
    
              <Pressable style={styles.choice(isPlaying, selected.current === 2, choices.findIndex(item => item.order === 2) === 0)} onPress={() => onPressAnswer(2)}>
                <Text style={styles.text}>
                  {colorCode === 'HEX' 
                    ? choices.find(item => item.order === 2).hexColor
                    : choices.find(item => item.order === 2).decimalColor
                  }
                </Text>
              </Pressable>
            </View>
    
          </View>
          <View style={styles.bottomSide}>
            {!isPlaying && (
              <Pressable style={styles.nextButton} onPress={onPressNext}>
                <Text style={styles.text}>next color</Text>
              </Pressable>
            )}
          </View>

        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: (isDarkMode) => ({
        flex: 1,
        backgroundColor: isDarkMode ? colors.dark : colors.light,
        alignItems: 'center',
      }),
      
      mainSide: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: "100%"
      },
      
      dashboard: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24
      },
    
      streak: (darkMode) => ({
        color: darkMode ? colors.light : colors.dark,
        fontSize: 32,
        fontWeight: "700"
      }),
    
      settings: (darkMode) => ({
        height: 30,
        width: 30,
        tintColor: darkMode ? colors.light : colors.dark,
      }),
    
      colorWindow: (color, isDarkMode) => ({
        height: "60%",
        width: "95%",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: isDarkMode ? colors.light : colors.dark,
        backgroundColor: color
      }),
    
      choicesArea: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
      },
    
      choice: (isPlaying, isSelected, isCorrenct) => ({
        backgroundColor: isPlaying 
          ? colors.secondary 
          : isCorrenct 
            ? colors.correct 
            : isSelected 
              ? colors.wrong 
              : colors.secondary,
        padding: 8,
        borderRadius: 6,
        width: "30%"
      }),

      text: {
        fontSize: 18,
        alignSelf: "center"
      },
      
      bottomSide: {
        flex:1,
        width: "30%"
      },
    
      nextButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 6
      },
    
    });
    