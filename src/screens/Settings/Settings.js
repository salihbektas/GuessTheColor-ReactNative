import { Button, StyleSheet, Text, View } from "react-native";
import colors from "../../Colors";
import { useSettings, useSettingsDispatch } from "../../context/SettingContext";


export default function Settings(){

    const darkMode = useSettings().isDarkMode

    const dispatch = useSettingsDispatch()

    function changeDarkMode(){
        dispatch({
            type: "setDarkMode",
            darkMode: !darkMode
        })
    }

    return(
        <View style={styles.container(darkMode)} >

            <Button title = "Change Dark Mode" onPress={changeDarkMode} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: (isDarkMode) => ({
        flex: 1,
        backgroundColor: isDarkMode ? colors.dark : colors.light,
        alignItems: 'center',
        justifyContent: "center"
      }),
})