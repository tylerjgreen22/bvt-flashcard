import "./App.css";
import { useEffect, useState } from "react";
import { getCategories, getFlashcards } from "./api/flashcardApi";
import Flashcard from "./components/Flashcard/Flashcard";

type Category = {
  id: number;
  name: string;
};

type Flashcards = {
  question: string;
  options: string[];
  answer: string;
};

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState({
    question: "",
    options: [],
    answer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategories();
      if (res) {
        setCategories(res);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFlashcards(selectedCategory);
      if (res) {
        setFlashcards(res);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const onChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const onClick = (flashcard: any) => {
    setSelectedFlashcard(flashcard);
  };

  return (
    <div className="app-container">
      <div>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={onChange}
        >
          <option value={-1}>Select a Category:</option>
          {categories.length &&
            categories.map((category: Category) => (
              <option value={category.id}>{category.name}</option>
            ))}
        </select>

        {flashcards.length
          ? flashcards.map((flashcard: Flashcards) => (
              <div
                className="flashcards-container"
                onClick={() => {
                  onClick(flashcard);
                }}
              >
                <div className="flashcard">
                  <div className="inner">
                    <h1>{flashcard.question}</h1>
                    {flashcard.options.map((option: string) => (
                      <p>{option}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      <div>
        {selectedFlashcard.options.length ? (
          <Flashcard
            question={selectedFlashcard.question}
            options={selectedFlashcard.options}
            answer={selectedFlashcard.answer}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
