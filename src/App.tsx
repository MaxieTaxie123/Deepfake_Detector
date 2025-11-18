import Container from "./components/Container";
import { useEffect, useState } from "react";
import { useImagePreload } from "./imagePreload";
import Tutorial from "./components/Tutorial";
import Summary from "./components/Summary";
import "./App.css";

function App() {
    const [view, setView] = useState<"tutorial" | "game" | "summary">("tutorial");

    const urls = [
      "./deepfakes/Jonge-vrouw.jpg", "./reals/Jonge-vrouw-1.jpg",
      "./deepfakes/Oudere-man.jpg", "./reals/Oudere-man-1.jpg",
      "./deepfakes/Pasfoto.jpg", "./reals/Pasfoto-1.jpg",
      "./deepfakes/Zijkant.jpg", "./reals/Zijkant-1.jpg",
      "./deepfakes/Zittende-vrouw.jpg", "./reals/Zittende-vrouw-1.jpg",
      "./deepfakes/Stef.jpg", "./reals/Stef-1.jpg",
    ];

    // saveToLocalStorage: true will attempt to convert images to data URLs and store them
    const { loaded, failed } = useImagePreload(urls, {
      saveToLocalStorage: true,     // keeps the opt-in flag name but will use chosen storage
      storage: 'indexedDB',
      namespace: 'deepfake',
      maxSizeKB: 1024 * 10,
      maxEntries: 500,              // only used for localStorage eviction
    });

    useEffect(() => {
      console.log("Preload complete:", loaded);
      if (failed.length > 0) {
        console.warn("Failed to load:", failed);
      }
    }, [loaded, failed]);

    if (view === "tutorial") {
      return <Tutorial onStart={() => setView("game")} />;
    }

    if (view === "summary") {
      return <Summary onBack={() => setView("game")} />;
    }

    return (
      <Container
        // if you want, you can later add an onFinished={() => setView("summary")}
      />
    );
}

export default App;
