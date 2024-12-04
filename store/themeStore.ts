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
        let nr = state.iconRotation
        if ((newTheme === themeMode.dark && (nr / 180) % 2 === 0) || (newTheme === themeMode.light && (nr / 180) % 2 === 1)) {
            nr = state.iconRotation + 180;
        }
        return {
            theme: newTheme,
            iconRotation: nr
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
