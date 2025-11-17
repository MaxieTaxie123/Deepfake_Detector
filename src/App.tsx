import Container from "./components/Container";
import { useEffect, useState } from "react";
import { useImagePreload } from "./imagePreload";
import Tutorial from "./components/Tutorial";
import "./App.css";

function App() {
  const [showTutorial, setShowTutorial] = useState(true)

  const { loaded, failed } = useImagePreload([
    "./deepfakes/Jonge-vrouw.jpg", "./reals/Jonge-vrouw-1.jpg",
    "./deepfakes/Oudere-man.jpg", "./reals/Oudere-man-1.jpg",
    "./deepfakes/Pasfoto.jpg", "./reals/Pasfoto-1.jpg",
    "./deepfakes/Zijkant.jpg", "./reals/Zijkant-1.jpg",
    "./deepfakes/Zittende-vrouw.jpg", "./reals/Zittende-vrouw-1.jpg",
    "./deepfakes/Stef.jpg", "./reals/Stef-1.jpg",
  ]);

  useEffect(() => {
    console.log("Preload complete:", loaded);
    if (failed.length > 0) {
      console.warn("Failed to load:", failed);
    }
  }, [loaded, failed]);

  return showTutorial ? (
    <Tutorial onStart={() => setShowTutorial(false)} />
  ) : (
    <Container /> // your game component
  );
}

export default App;
