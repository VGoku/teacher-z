import React, { useState } from 'react';

const FlashcardsTool = () => {
  const [cards, setCards] = useState([]);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const addCard = () => {
    if (!term || !definition) {
      alert('Both term and definition are required.');
      return;
    }
    setCards([...cards, { term, definition }]);
    setTerm('');
    setDefinition('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={addCard}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Flashcard
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Flashcard Deck</h3>
        {cards.length === 0 ? (
          <p>No flashcards added yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {cards.map((card, index) => (
              <li key={index}><strong>{card.term}:</strong> {card.definition}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlashcardsTool; 