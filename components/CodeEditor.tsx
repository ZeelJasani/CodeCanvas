import { cn } from "@/lib/utils";
import flourite from "flourite";
import { codeSnippets, fonts } from "@/options";
import hljs from "highlight.js";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { usePreferencesStore } from "@/store/use-preferences-store";
import WindowControls from "@/components/WindowControls";

export default function CodeEditor() {
  const store = usePreferencesStore();

  // Add random code snippets on mount
  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    usePreferencesStore.setState(randomSnippet);
  }, []);

  // Auto Detect Language
  useEffect(() => {
    if (store.autoDetectLanguage) {
      // use flourite to detect language and provide highlighting
      const { language } = flourite(store.code, { noUnknown: true });
      usePreferencesStore.setState({
        language: language.toLowerCase() || "plaintext",
      });
    }
  }, [store.autoDetectLanguage, store.code]);

  return (
    <div
      className={cn(
        "rounded-xl shadow-2xl overflow-hidden transition-all",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
      style={{
        borderWidth: `${store.imageBorderWidth}px`,
        borderStyle: 'solid',
        borderColor: store.darkMode ? 'rgba(75, 85, 99, 0.4)' : 'rgba(229, 231, 235, 0.2)'
      }}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <WindowControls
          style={store.windowControlStyle}
          size={store.windowScale}
        />
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) =>
              usePreferencesStore.setState({ title: e.target.value })
            }
            spellCheck={false}
            onClick={(e) => {
              if (e.target instanceof HTMLInputElement) {
                e.target.select();
              }
            }}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => usePreferencesStore.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" })
              .value
          }
          style={{
            fontFamily: fonts[store.fontStyle as keyof typeof fonts].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => {
            if (e.target instanceof HTMLTextAreaElement) {
              e.target.select();
            }
          }}
        />
      </div>
    </div>
  );
}
