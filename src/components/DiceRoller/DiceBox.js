import DiceBox from "@3d-dice/dice-box";

const Dice = new DiceBox(
  "#dice-box", 
  {
    id: "dice-canvas",
    assetPath: `${process.env.PUBLIC_URL}/assets/dice-box/`,
    startingHeight: 8,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9
  }
);

let diceInitialized = false;

const initializeDice = async () => {
  if (!diceInitialized) {
    await Dice.init();
    diceInitialized = true;
  }
};

export { Dice, initializeDice };
