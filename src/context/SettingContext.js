import { createContext, useContext, useReducer } from "react";

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
      return { ...states, isDarkMode: action.darkMode };
    }
    case 'setColorCode': {
      return { ...states, colorCode: action.colorCode };
    }
    case 'setMaxStreak': {
      return { ...states, maxStreak: action.maxStreak };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStates = {
  isDarkMode: true,
  colorCode: "HEX",
  maxStreak: 0
}