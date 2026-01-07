import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/store/use-preferences-store";
import WindowControls from "@/components/WindowControls";

export default function ImageCanvas() {
    const store = usePreferencesStore();

    return (
        <div
            className={cn(
                "rounded-xl shadow-2xl transition-all",
                store.darkMode
                    ? "bg-black/75 border-gray-600/40"
                    : "bg-white/75 border-gray-200/20"
            )}
            style={{
                borderWidth: `${store.imageBorderWidth}px`,
                borderStyle: 'solid',
                // Preserve transparency logic or color if set previously?
                // The user unified styling, so we stick to the classNames for color,
                // but use inline style for width.
                borderColor: store.darkMode ? 'rgba(75, 85, 99, 0.4)' : 'rgba(229, 231, 235, 0.2)'
            }}
        >
            <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
                <WindowControls
                    style={store.windowControlStyle}
                    size={store.windowScale}
                />
                {/* Filename input removed as requested */}
            </header>
            <div
                className={cn(
                    "px-4 pb-4 min-h-[300px] flex items-center justify-center",
                    store.darkMode
                        ? "brightness-110"
                        : "text-gray-800 brightness-50 saturate-200 contrast-200"
                )}
            >
                {store.imageUrl ? (
                    <img
                        src={store.imageUrl}
                        alt={store.title}
                        className="rounded-lg"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "600px",
                            objectFit: store.imageObjectFit,
                        }}
                    />
                ) : (
                    <div className="text-center text-gray-500">
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
