import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/store/use-preferences-store";
import WindowControls from "@/components/WindowControls";

import BrowserWindowHeader from "@/components/BrowserWindowHeader";

export default function ImageCanvas() {
    const store = usePreferencesStore();

    return (
        <div
            className={cn(
                "rounded-xl shadow-2xl transition-all overflow-hidden flex flex-col",
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
            {store.windowControlStyle === "macos" ? (
                <BrowserWindowHeader width={0} />
            ) : (
                <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
                    <WindowControls
                        style={store.windowControlStyle}
                        size={store.windowScale}
                    />
                </header>
            )}

            <div
                className={cn(
                    "flex items-center justify-center overflow-hidden",
                    // If using browser header, we want full width image usually? 
                    // But user might want padding inside the browser window?
                    // The reference image shows the image content (the website content) filling the window.
                    // So we might remove px-4 pb-4 if macos style?
                    // Let's keep it safe but maybe reduce padding for 'browser' feel if desired.
                    // Actually standard screenshot tools usually have no padding inside the browser frame around the viewport content.
                    store.windowControlStyle === "macos" ? "p-0 bg-white" : "px-4 pb-4",

                    store.darkMode && store.windowControlStyle !== "macos"
                        ? "brightness-110"
                        : "",
                    !store.darkMode && store.windowControlStyle !== "macos"
                        ? "text-gray-800 brightness-50 saturate-200 contrast-200"
                        : ""
                )}
            >
                {store.imageUrl ? (
                    <img
                        src={store.imageUrl}
                        alt={store.title}
                        className={store.windowControlStyle === "macos" ? "w-full h-auto object-cover" : "rounded-lg"}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "800px", // Increased max height for browser view
                            objectFit: store.imageObjectFit,
                        }}
                    />
                ) : (
                    <div className="text-center text-gray-500 p-8">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mt-2 text-sm">No image uploaded</p>
                        <p className="text-xs mt-1">Upload an image to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}
