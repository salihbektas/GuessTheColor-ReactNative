import { Button, StyleSheet, Text, View } from "react-native";
import colors from "../../Colors";
import { useSettings, useSettingsDispatch } from "../../context/SettingContext";


export default function Settings(){

    const {isDarkMode : darkMode, colorCode, maxStreak} = useSettings()

    const dispatch = useSettingsDispatch()

    function changeDarkMode(){
        dispatch({
            type: "setDarkMode",
            darkMode: !darkMode
        })
    }

    function changeColorCode(){
        dispatch({
            type: "setColorCode",
            colorCode: colorCode === 'HEX' ? 'DEC' : 'HEX'
        })
    }

    return(
        <View style={styles.container(darkMode)} >
            <Text style={{color: darkMode ? colors.light : colors.dark}}>{`Theme: ${darkMode ? "dark" : "light"}`}</Text>
            <Button title = "Change Dark Mode" onPress={changeDarkMode} />
            <Text style={{color: darkMode ? colors.light : colors.dark}}>{`ColorCode: ${colorCode}`}</Text>
            <Button title = "Change Color Code" onPress={changeColorCode} />
            <Text style={{color: darkMode ? colors.light : colors.dark}}>{`MaxStreak: ${maxStreak}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (isDarkMode) => ({
        flex: 1,
        backgroundColor: isDarkMode ? colors.dark : colors.light,
        alignItems: 'center',
        justifyContent: "space-evenly"
      }),
})