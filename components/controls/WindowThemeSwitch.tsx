import { usePreferencesStore } from "@/store/use-preferences-store";
import { Switch } from "../ui/switch";

export default function WindowThemeSwitch() {
    const windowTheme = usePreferencesStore((state) => state.windowTheme);

    return (
        <div>
            <label className="block mb-2 text-xs font-medium text-neutral-400">
                Window Dark Mode
            </label>
            <Switch
                checked={windowTheme === 'dark'}
                onCheckedChange={(checked) =>
                    usePreferencesStore.setState({ windowTheme: checked ? 'dark' : 'light' })
                }
                className="my-1.5"
            />
        </div>
    );
}
