export interface Pair {
    deepfake: string;
    real: string;
}

export const imagePairs: string[][] = [
    // Pair 1
    ["./deepfakes/Jonge-vrouw.jpg", "./reals/Jonge-vrouw-1.jpg"],
    // Pair 2
    ["./deepfakes/Oudere-man.jpg", "./reals/Oudere-man-1.jpg"],
    // Pair 3
    ["./deepfakes/Pasfoto.jpg", "./reals/Pasfoto-1.jpg"],
    // Pair 4
    ["./deepfakes/Zijkant.jpg", "./reals/Zijkant-1.jpg"],
    // Pair 5
    ["./deepfakes/Zittende-vrouw.jpg", "./reals/Zittende-vrouw-1.jpg"],
    // Pair 6
    ["./deepfakes/Stef.jpg", "./reals/Stef-1.jpg"],
];