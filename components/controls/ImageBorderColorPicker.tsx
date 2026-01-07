import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ImageBorderColorPicker() {
    const imageBorderColor = usePreferencesStore(
        (state) => state.imageBorderColor
    );
    const setImageBorderColor = usePreferencesStore(
        (state) => state.setImageBorderColor
    );

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Border Color</Label>
            <div className="flex items-center gap-2">
                <Input
                    type="color"
                    value={imageBorderColor}
                    onChange={(e) => setImageBorderColor(e.target.value)}
                    className="w-12 h-8 p-1 bg-transparent border-neutral-700 cursor-pointer"
                />
                <Input
                    type="text"
                    value={imageBorderColor}
                    onChange={(e) => setImageBorderColor(e.target.value)}
                    className="w-24 h-8 text-xs bg-transparent border-neutral-700"
                    placeholder="#4b5563"
                />
            </div>
        </div>
    );
}
