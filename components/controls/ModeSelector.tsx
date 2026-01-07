import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ModeSelector() {
    const canvasMode = usePreferencesStore((state) => state.canvasMode);
    const setCanvasMode = usePreferencesStore((state) => state.setCanvasMode);

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Canvas Mode</Label>
            <div className="flex gap-1 bg-neutral-800 p-1 rounded-lg">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCanvasMode("code")}
                    className={cn(
                        "flex-1 text-xs",
                        canvasMode === "code"
                            ? "bg-neutral-700 text-white"
                            : "text-gray-400 hover:text-white"
                    )}
                >
                    Code
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCanvasMode("image")}
                    className={cn(
                        "flex-1 text-xs",
                        canvasMode === "image"
                            ? "bg-neutral-700 text-white"
                            : "text-gray-400 hover:text-white"
                    )}
                >
                    Image
                </Button>
            </div>
        </div>
    );
}
