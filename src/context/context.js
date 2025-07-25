import React, { createContext, useContext } from "react";

export const themeMode = createContext({
    theme: 'light',
    toggleTheme: () => {}
})

export const ThemeModeContextProvider = themeMode.Provider

export default function useTheme(){
    return useContext(themeMode)
}