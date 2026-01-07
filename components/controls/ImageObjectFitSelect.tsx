import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ImageObjectFitSelect() {
    const imageObjectFit = usePreferencesStore((state) => state.imageObjectFit);
    const setImageObjectFit = usePreferencesStore(
        (state) => state.setImageObjectFit
    );

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Image Fit</Label>
            <Select
                value={imageObjectFit}
                onValueChange={(value) =>
                    setImageObjectFit(value as "cover" | "contain" | "fill" | "none")
                }
            >
                <SelectTrigger className="w-[140px] bg-transparent border-neutral-700 text-sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="contain">Contain</SelectItem>
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="fill">Fill</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
