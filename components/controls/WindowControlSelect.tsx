import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function WindowControlSelect() {
    const windowControlStyle = usePreferencesStore(
        (state) => state.windowControlStyle
    );
    const setWindowControlStyle = usePreferencesStore(
        (state) => state.setWindowControlStyle
    );

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Window Style</Label>
            <Select
                value={windowControlStyle}
                onValueChange={(value) =>
                    setWindowControlStyle(value as "macos" | "windows" | "none")
                }
            >
                <SelectTrigger className="w-[140px] bg-transparent border-neutral-700 text-sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
