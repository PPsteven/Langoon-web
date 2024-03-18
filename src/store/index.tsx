import { createContext } from "react";
import type { State } from "@/hooks/usePlayer";

export const PlayerContext = createContext<{sound: Howl; exposedData: State} | null>(null);

export const SearchContext = createContext<{search: string, setSearch: (value: string) => void} | null>(null);

export const ThemeContext = createContext<{theme: string, setTheme: (value: string) => void} | null>(null);