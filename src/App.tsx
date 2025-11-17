import Container from "./components/Container";
import { useEffect } from "react";
import { useImagePreload } from "./imagePreload";
import "./App.css";

function App() {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 sans-serif text-center">
      <Container />
    </div>
  );
}

export default App;
