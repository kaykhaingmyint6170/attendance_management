import { ref, watch } from 'vue';

const THEME_KEY = 'theme';

function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    // Default to dark
    return 'dark';
}

const isDark = ref(getInitialTheme() === 'dark');

function applyTheme(dark) {
    const root = document.documentElement;
    if (dark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}

// Apply immediately on import (before mount)
applyTheme(isDark.value);

watch(isDark, (val) => applyTheme(val));

export function useTheme() {
    function toggleTheme() {
        isDark.value = !isDark.value;
    }

    return { isDark, toggleTheme };
}
