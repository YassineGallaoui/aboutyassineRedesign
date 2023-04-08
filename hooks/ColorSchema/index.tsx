import { useEffect, useState } from 'react';

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    handleChange(); // Set initial value
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return colorScheme;
};

export default useColorScheme;