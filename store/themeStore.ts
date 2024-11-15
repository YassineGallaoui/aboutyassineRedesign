import { create } from 'zustand';

export enum themeMode {
    light,
    dark,
}

interface ThemeStore {
    theme: themeMode;
    iconRotation: number;
    colors: {
        lightColor: string,
        darkColor: string,
    }
    setTheme: (newTheme: themeMode) => void;
    setIconRotation: (newRotation: number) => void;
    setColors: (lightColor: string, darkColor: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
    theme: themeMode.dark,
    iconRotation: 0,
    colors: {
        lightColor: '',
        darkColor: ''
    },
    setTheme: (newTheme) => set({ theme: newTheme }),
    setIconRotation: (newRotation) => set({ iconRotation: newRotation }),
    setColors: (lightColor, darkColor) => set({
        colors: {
            lightColor: lightColor,
            darkColor: darkColor,
        }
    }),
}));

export default useThemeStore;
