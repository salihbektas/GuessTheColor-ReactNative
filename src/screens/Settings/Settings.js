import { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../Colors";
import { useSettings, useSettingsDispatch } from "../../context/SettingContext";


export default function Settings(){

    const [themes, setThemes] = useState([{label: 'DARK', value: true}, {label: 'LIGHT', value: false}])
    const [colorCodes, setColorCodes] = useState([{label: 'R,G,B', value: 'DEC'}, {label: '#HEX', value: 'HEX'}])

    const {isDarkMode : darkMode, colorCode, maxStreak} = useSettings()
    
    const [valueTheme, setValueTheme] = useState(darkMode);
    const [valueColorCode, setValueColorCode] = useState(colorCode);
    const [openTheme, setOpenTheme] = useState(false);
    const [openColorCode, setOpenColorCode] = useState(false);
    
    const onThemeOpen = useCallback(() => {
        setOpenColorCode(false)
    }, [])

    const onColorCodeOpen = useCallback(() => {
        setOpenTheme(false)
    }, [])

    const dispatch = useSettingsDispatch()

    useEffect(() => {
        dispatch({
            type: "setDarkMode",
            darkMode: valueTheme
        })
    }, [valueTheme])

    useEffect(() => {
        dispatch({
            type: "setColorCode",
            colorCode: valueColorCode
        })
    }, [valueColorCode])

    return(
        <View style={styles.container(darkMode)} >
            <View style={styles.row}>
                <Text style={styles.text(darkMode)}>{'Theme:'}</Text>
                <DropDownPicker
                    open={openTheme}
                    value={valueTheme}
                    items={themes}
                    setOpen={setOpenTheme}
                    setValue={setValueTheme}
                    onOpen={onThemeOpen}
                    theme= {darkMode ? 'LIGHT' : 'DARK'}
                    containerStyle={styles.dropDownPicker}
                    style={styles.dropDownPickerStyle(darkMode)}
                    dropDownContainerStyle={styles.dropDownPickerStyle(darkMode)}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.text(darkMode)}>{'ColorCode:'}</Text>
                <DropDownPicker
                    open={openColorCode}
                    value={valueColorCode}
                    items={colorCodes}
                    setOpen={setOpenColorCode}
                    setValue={setValueColorCode}
                    onOpen={onColorCodeOpen}
                    theme= {darkMode ? 'LIGHT' : 'DARK'}
                    containerStyle={styles.dropDownPicker}
                    style={styles.dropDownPickerStyle(darkMode)}
                    dropDownContainerStyle={styles.dropDownPickerStyle(darkMode)}
                />
            </View>
            <Text style={styles.text(darkMode)}>{`MaxStreak: ${maxStreak}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: (isDarkMode) => ({
        flex: 1,
        backgroundColor: isDarkMode ? colors.dark : colors.light,
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingHorizontal: 16
    }),

    row: {
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },

    text: (darkMode) => ({
        color: darkMode ? colors.light : colors.dark,
        fontSize:24
    }),

    dropDownPicker: {width: "40%"},

    dropDownPickerStyle: (darkMode) => ({
        backgroundColor: darkMode ? colors.light : colors.dark
    })


})