import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Represents the available theme modes for the application.
 * - light: Represents the light theme mode.
 * - dark: Represents the dark theme mode.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Interface representing the user's theme preferences.
 *  - version{number}: The version of the theme data structure.
 *  - mode{ThemeMode}: The current theme mode.
 */
export interface IUserTheme {
	/**
	 * The version of the theme data structure.
	 */
	version: number;
	/**
	 * The current theme mode.
	 */
	mode: ThemeMode;
}

/**
 * Interface extending IUserTheme with a method to toggle the theme.
 *
 */
interface ThemeContextType extends IUserTheme {
	/**
	 * Function to toggle between light and dark themes.
	 */
	toggleTheme: () => void;
}

/**
 * Constant representing the current version of the theme data structure.
 */
const THEME_VERSION = 1 as const;

const themeDefine = (): ThemeMode => {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component that manages and provides theme context for the application.
 * It handles theme persistence, automatic theme detection, and theme toggling.
 *
 * @param {Object} props - The props for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the ThemeProvider.
 * @returns {JSX.Element} A ThemeContext.Provider wrapping the children with theme context.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<IUserTheme>(() => {
		const savedTheme = localStorage.getItem('themeData');
		if (savedTheme) {
			const parsedTheme = JSON.parse(savedTheme);
			if (parsedTheme.version === THEME_VERSION) {
				return parsedTheme;
			}
		}
		return { mode: themeDefine(), version: THEME_VERSION };
	});

	useEffect(() => {
		document.body.setAttribute('data-theme', theme.mode);
		localStorage.setItem('themeData', JSON.stringify(theme));
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => ({
			...prevTheme,
			mode: prevTheme.mode === 'light' ? 'dark' : 'light',
		}));
	};

	return (
		<ThemeContext.Provider value={{ ...theme, toggleTheme }}>{children}</ThemeContext.Provider>
	);
};

/**
 * A custom hook that provides access to the current theme context.
 * This hook must be used within a component that is wrapped by a ThemeProvider.
 *
 * @throws {Error} Throws an error if used outside of a ThemeProvider.
 * @returns {ThemeContextType} An object containing:
 *   - version {number}: The current version of the theme data structure.
 *   - mode {ThemeMode}: The current theme mode ('light' or 'dark').
 *   - toggleTheme {() => void}: A function to switch between light and dark themes.
 */
export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
