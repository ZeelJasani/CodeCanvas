import { create } from "zustand";
import { persist } from "zustand/middleware";

// export const usePreferencesStore = create(
//   persist(
//     () => ({
//       code: "",
//       title: "Untitled",
//       theme: "hyper",
//       darkMode: true,
//       showBackground: true,
//       language: "plaintext",
//       autoDetectLanguage: false,
//       fontSize: 16,
//       fontStyle: "jetBrainsMono",
//       padding: 64,
//     }),
//     {
//       name: "user-preferences",
//     }
//   )
// );

// Persistent: Saves data to localStorage under the key user-preferences, so the state is retained after refreshing/restarting the app.

interface PreferencesState {
  code: string;
  title: string;
  theme: string;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;

  // Canvas mode
  canvasMode: "code" | "image";

  // Image properties
  imageUrl: string;
  imageObjectFit: "cover" | "contain" | "fill" | "none";

  // Window controls
  windowControlStyle: "macos" | "windows" | "none";
  windowScale: number;

  // Image border customization
  imageBorderColor: string;
  imageBorderWidth: number;
  imageBackgroundColor: string;


  // Setters
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  toggleBackground: () => void;
  setLanguage: (language: string) => void;
  setAutoDetectLanguage: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setFontStyle: (style: string) => void;
  setPadding: (padding: number) => void;
  setCanvasMode: (mode: "code" | "image") => void;
  setImageUrl: (url: string) => void;
  setImageObjectFit: (fit: "cover" | "contain" | "fill" | "none") => void;
  setWindowControlStyle: (style: "macos" | "windows" | "none") => void;
  setWindowScale: (scale: number) => void;
  setImageBorderColor: (color: string) => void;
  setImageBorderWidth: (width: number) => void;
  setImageBackgroundColor: (color: string) => void;
}

// Create a persistent Zustand store with type safety and update methods
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: "jetBrainsMono",
      padding: 64,

      // Canvas mode defaults
      canvasMode: "code",

      // Image defaults
      imageUrl: "",
      imageObjectFit: "contain",

      // Window controls default
      windowControlStyle: "macos",
      windowScale: 1,

      // Image border customization defaults
      imageBorderColor: "#4b5563", // gray-600
      imageBorderWidth: 2,
      imageBackgroundColor: "#1f2937", // gray-800

      // Setters
      setCode: (code) => set({ code }),
      setTitle: (title) => set({ title }),
      setTheme: (theme) => set({ theme }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleBackground: () =>
        set((state) => ({ showBackground: !state.showBackground })),
      setLanguage: (language) => set({ language }),
      setAutoDetectLanguage: (enabled) => set({ autoDetectLanguage: enabled }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontStyle: (style) => set({ fontStyle: style }),
      setPadding: (padding) => set({ padding }),
      setCanvasMode: (mode) => set({ canvasMode: mode }),
      setImageUrl: (url) => set({ imageUrl: url }),
      setImageObjectFit: (fit) => set({ imageObjectFit: fit }),
      setWindowControlStyle: (style) => set({ windowControlStyle: style }),
      setWindowScale: (scale: number) => set({ windowScale: scale }),
      setImageBorderColor: (color) => set({ imageBorderColor: color }),
      setImageBorderWidth: (width) => set({ imageBorderWidth: width }),
      setImageBackgroundColor: (color) => set({ imageBackgroundColor: color }),
    }),
    {
      name: "user-preferences", // Key used in localStorage
    }
  )
);
