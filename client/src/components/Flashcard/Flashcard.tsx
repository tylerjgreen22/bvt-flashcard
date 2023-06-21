import "./Flashcard.css";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

type Flashcard = {
  question: string;
  options: string[];
  answer: string;
};

function Flashcard(props: Flashcard) {
  const [showFront, setShowFront] = useState(true);
  const { question, options, answer } = props;

  return (
    <div className="container">
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <div
          className="card"
          onClick={() => {
            setShowFront((prev) => !prev);
          }}
        >
          <div className="card back">{answer}</div>
          <div className="card front">
            <div className="content-container">
              <h1>{question}</h1>
              {options.map((option) => (
                <p>{option}</p>
              ))}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Flashcard;
