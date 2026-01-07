"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { usePreferencesStore } from "@/store/use-preferences-store";
import { fonts } from "@/options";
import { themes } from "@/options";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";
import ImageCanvas from "@/components/ImageCanvas";
import WidthMeasurement from "@/components/WidthMeasurement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Resizable } from "re-resizable";
import ThemeSelect from "@/components/controls/ThemeSelect";
import LanguageSelect from "@/components/controls/LanguageSelect";
import { ResetIcon } from "@radix-ui/react-icons";
import FontSelect from "@/components/controls/FontSelect";
import FontSizeInput from "@/components/controls/FontSizeInput";
import PaddingSlider from "@/components/controls/PaddingSlider";
import BackgroundSwitch from "@/components/controls/BackgroundSwitch";
import DarkModeSwitch from "@/components/controls/DarkModeSwitch";
import ExportOptions from "@/components/controls/ExportOptions";
import ImageUploader from "@/components/controls/ImageUploader";
import WindowControlSelect from "@/components/controls/WindowControlSelect";
import ImageObjectFitSelect from "@/components/controls/ImageObjectFitSelect";
import WindowScaleSlider from "@/components/controls/WindowScaleSlider";
import FrameWidthSlider from "@/components/controls/FrameWidthSlider";

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);

  const theme = usePreferencesStore((state) => state.theme);
  const padding = usePreferencesStore((state) => state.padding);
  const fontStyle = usePreferencesStore((state) => state.fontStyle);
  const showBackground = usePreferencesStore((state) => state.showBackground);
  const canvasMode = usePreferencesStore((state) => state.canvasMode);
  const imageUrl = usePreferencesStore((state) => state.imageUrl);

  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);

    usePreferencesStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  return (
    <main className="dark min-h-screen flex flex-col gap-4 justify-center items-center bg-neutral-950 text-white p-4">
      <link
        rel="stylesheet"
        href={themes[theme as keyof typeof themes].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle as keyof typeof fonts].src}
        crossOrigin="anonymous"
      />

      <div className="w-full overflow-auto flex grow items-center justify-center p-4 border rounded-xl border-b-gray-900">
        <Resizable
          enable={{ left: true, right: true }}
          minWidth={padding * 2 + 300}
          maxWidth="100%"
          size={{ width }}
          onResize={(e, dir, ref) => setWidth(ref.offsetWidth.toString())}
          onResizeStart={() => setShowWidth(true)}
          onResizeStop={() => setShowWidth(false)}
        >
          <div
            className={cn(
              "overflow-hidden mb-2 transition-all ease-out",
              showBackground
                ? themes[theme as keyof typeof themes].background
                : "ring ring-neutral-900"
            )}
            style={{ padding }}
            ref={editorRef}
          >
            {!imageUrl ? <CodeEditor /> : <ImageCanvas />}
          </div>
          <WidthMeasurement showWidth={showWidth} width={Number(width)} />
          <div
            className={cn(
              "transition-opacity w-fit mx-auto -mt-4",
              showWidth || width === "auto"
                ? "invisible opacity-0 hidden"
                : "visible opacity-100"
            )}
          >
            <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
              <ResetIcon className="mr-2" />
              Reset width
            </Button>
          </div>
        </Resizable>
      </div>

      <Card className="p-6 w-fit bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-4 sm:gap-6 p-0">
          <ImageUploader />
          <ThemeSelect />
          {!imageUrl && (
            <>
              <LanguageSelect />
              <FontSelect />
              <FontSizeInput />
            </>
          )}
          {!!imageUrl && <ImageObjectFitSelect />}
          <WindowScaleSlider />
          <FrameWidthSlider />
          <PaddingSlider />
          <BackgroundSwitch />
          <DarkModeSwitch />
          <WindowControlSelect />
          <div className="w-px bg-neutral-800" />
          <div className="place-self-center">
            <ExportOptions
              targetRef={
                editorRef as unknown as React.RefObject<HTMLDivElement>
              }
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
