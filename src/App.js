import "./App.css";
import * as React from "react";

const home = "/react-memory-game";

const cardImages = [
  { src: home + "/img/pikachu.png", matched: false },
  { src: home + "/img/balbasaur.png", matched: false },
  { src: home + "/img/charmander.png", matched: false },
  { src: home + "/img/squirtle.png", matched: false },
  { src: home + "/img/jigglypuff.png", matched: false },
  { src: home + "/img/evee.png", matched: false },
];

function App() {
  // state
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState(null);
  const [choiceTwo, setChoiceTwo] = React.useState(null);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Match Pokemon</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          // <div className="flip-card" key={card.id}>
          <div
            className={
              card === choiceOne || card === choiceTwo || card.matched
                ? "flip-card flipped"
                : "flip-card"
            }
            key={card.id}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img className="front" src={card.src} alt="card front" />
              </div>
              <div className="flip-card-back">
                <img
                  className="back"
                  src={home + "/img/cover.png"}
                  alt="card back"
                  onClick={() => handleChoice(card)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
