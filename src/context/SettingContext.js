import { createContext, useContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext(null);

const SettingsDispatchContext = createContext(null);


export function SettingsProvider({ children }) {
  const [states, dispatch] = useReducer(
    settingsReducer,
    initialStates
  );


  return (
    <SettingsContext.Provider value={states}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

function settingsReducer(states, action) {
  switch (action.type) {
    case 'setDarkMode': {
      AsyncStorage.setItem("configs", JSON.stringify({...states, darkMode: action.darkMode }))
      return { ...states, darkMode: action.darkMode };
    }
    case 'setColorCode': {
      AsyncStorage.setItem("configs", JSON.stringify({...states, colorCode: action.colorCode }))
      return { ...states, colorCode: action.colorCode };
    }
    case 'setMaxStreak': {
      AsyncStorage.setItem("configs", JSON.stringify({...states, maxStreak: action.maxStreak }))
      return { ...states, maxStreak: action.maxStreak };
    }
    case 'load': {
      return {...states, maxStreak: action.maxStreak, colorCode: action.colorCode, darkMode: action.darkMode}
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStates = {
  darkMode: false,
  colorCode: "HEX",
  maxStreak: 0
}