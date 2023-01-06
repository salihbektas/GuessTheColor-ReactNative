import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../Colors";
import { useSettings, useSettingsDispatch } from "../../context/SettingContext";


export default function Settings({ navigation }) {

  const [themes, setThemes] = useState([{ label: 'DARK', value: true }, { label: 'LIGHT', value: false }])
  const [colorCodes, setColorCodes] = useState([{ label: 'R,G,B', value: 'DEC' }, { label: '#HEX', value: 'HEX' }])

  const { darkMode, colorCode, maxStreak } = useSettings()

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

  return (
    <View style={styles.container(darkMode)} >
      <View style={styles.dashboard} >
        <Pressable onPress={() => navigation.goBack()} >
          <Image source={require("../../../assets/arrow.png")} style={styles.back(darkMode)} />
        </Pressable>
        <Text style={styles.settingText(darkMode)}>Settings</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text(darkMode)}>{'Theme:'}</Text>
        <DropDownPicker
          open={openTheme}
          value={valueTheme}
          items={themes}
          setOpen={setOpenTheme}
          setValue={setValueTheme}
          onOpen={onThemeOpen}
          theme={darkMode ? 'LIGHT' : 'DARK'}
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
          theme={darkMode ? 'LIGHT' : 'DARK'}
          containerStyle={styles.dropDownPicker}
          style={styles.dropDownPickerStyle(darkMode)}
          dropDownContainerStyle={styles.dropDownPickerStyle(darkMode)}
        />
      </View>
      <View style={styles.maxStreak}>
        <Text style={styles.text(darkMode)}>{`MaxStreak: ${maxStreak}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: (isDarkMode) => ({
    flex: 1,
    backgroundColor: isDarkMode ? colors.dark : colors.light,
    alignItems: 'center',
    paddingHorizontal: 16
  }),

  dashboard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },

  back: (darkMode) => ({
    height: 30,
    width: 30,
    tintColor: darkMode ? colors.light : colors.dark,
  }),

  settingText: (darkMode) => ({
    color: darkMode ? colors.light : colors.dark,
    fontSize: 32,
    fontWeight: "700"
  }),


  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 43
  },

  text: (darkMode) => ({
    color: darkMode ? colors.light : colors.dark,
    fontSize: 28
  }),

  dropDownPicker: { width: "40%" },

  dropDownPickerStyle: (darkMode) => ({
    backgroundColor: darkMode ? colors.light : colors.dark
  }),

  maxStreak:{ marginTop: 70 }


})