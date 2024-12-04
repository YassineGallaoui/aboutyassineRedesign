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
    setColors: (lightColor: string, darkColor: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
    theme: themeMode.dark,
    iconRotation: 0,
    colors: {
        lightColor: '',
        darkColor: ''
    },
    setTheme: (newTheme) => set((state) => {
        let newRotation = state.iconRotation + 180;
        if (newTheme === themeMode.dark && (newRotation / 180) % 2 === 0)
            newRotation += 180;
        return {
            theme: newTheme,
            iconRotation: newRotation
        };
    }),

    setColors: (lightColor, darkColor) => set({
        colors: {
            lightColor: lightColor,
            darkColor: darkColor,
        }
    }),
}));

export default useThemeStore;
