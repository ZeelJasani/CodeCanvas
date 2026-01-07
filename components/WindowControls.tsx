import { cn } from "@/lib/utils";

interface WindowControlsProps {
    style?: "macos" | "windows" | "none";
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    className?: string;
    size?: number; // Size multiplier based on border width
}

export default function WindowControls({
    style = "macos",
    onClose,
    onMinimize,
    onMaximize,
    className,
    size = 1,
}: WindowControlsProps) {
    if (style === "none") return null;

    // Calculate button size based on size prop (default is 8px = 0.5rem = h-2 w-2)
    const buttonSize = Math.max(6, Math.min(20, 8 * size)); // Clamp between 6px and 20px
    const gap = Math.max(4, Math.min(10, 6 * size)); // Scale gap proportionally

    if (style === "macos") {
        return (
            <div className={cn("flex", className)} style={{ gap: `${gap}px` }}>
                <button
                    onClick={onClose}
                    className="rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
                    aria-label="Close"
                />
                <button
                    onClick={onMinimize}
                    className="rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                    style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
                    aria-label="Minimize"
                />
                <button
                    onClick={onMaximize}
                    className="rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                    style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
                    aria-label="Maximize"
                />
            </div>
        );
    }

    // Windows style (future implementation)
    if (style === "windows") {
        const iconSize = Math.max(12, Math.min(24, 16 * size));
        return (
            <div className={cn("flex", className)} style={{ gap: `${gap / 2}px` }}>
                <button
                    onClick={onMinimize}
                    className="flex items-center justify-center hover:bg-gray-700 transition-colors"
                    style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                    aria-label="Minimize"
                >
                    <div className="bg-gray-400" style={{ width: `${iconSize / 2}px`, height: '2px' }} />
                </button>
                <button
                    onClick={onMaximize}
                    className="flex items-center justify-center hover:bg-gray-700 transition-colors"
                    style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                    aria-label="Maximize"
                >
                    <div className="border border-gray-400" style={{ width: `${iconSize / 2}px`, height: `${iconSize / 2}px` }} />
                </button>
                <button
                    onClick={onClose}
                    className="flex items-center justify-center hover:bg-red-600 transition-colors"
                    style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                    aria-label="Close"
                >
                    <div className="text-gray-400" style={{ fontSize: `${iconSize * 0.75}px` }}>×</div>
                </button>
            </div>
        );
    }

    return null;
}
