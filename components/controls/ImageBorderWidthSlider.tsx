import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function ImageBorderWidthSlider() {
    const imageBorderWidth = usePreferencesStore(
        (state) => state.imageBorderWidth
    );
    const setImageBorderWidth = usePreferencesStore(
        (state) => state.setImageBorderWidth
    );

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">
                Border Width: {imageBorderWidth}px
            </Label>
            <Slider
                value={[imageBorderWidth]}
                onValueChange={([value]) => setImageBorderWidth(value)}
                min={1}
                max={20}
                step={1}
                className="w-32"
            />
        </div>
    );
}
