import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function WindowScaleSlider() {
    const windowScale = usePreferencesStore((state) => state.windowScale);
    const setWindowScale = usePreferencesStore((state) => state.setWindowScale);

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">
                Button Size: {windowScale}x
            </Label>
            <Slider
                value={[windowScale]}
                onValueChange={([value]) => setWindowScale(value)}
                min={0.5}
                max={3}
                step={0.1}
                className="w-32"
            />
        </div>
    );
}
