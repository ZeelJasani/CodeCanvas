import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ImageBackgroundColorPicker() {
    const imageBackgroundColor = usePreferencesStore(
        (state) => state.imageBackgroundColor
    );
    const setImageBackgroundColor = usePreferencesStore(
        (state) => state.setImageBackgroundColor
    );

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Canvas Color</Label>
            <div className="flex items-center gap-2">
                <Input
                    type="color"
                    value={imageBackgroundColor}
                    onChange={(e) => setImageBackgroundColor(e.target.value)}
                    className="w-12 h-8 p-1 bg-transparent border-neutral-700 cursor-pointer"
                />
                <Input
                    type="text"
                    value={imageBackgroundColor}
                    onChange={(e) => setImageBackgroundColor(e.target.value)}
                    className="w-24 h-8 text-xs bg-transparent border-neutral-700"
                    placeholder="#1f2937"
                />
            </div>
        </div>
    );
}
