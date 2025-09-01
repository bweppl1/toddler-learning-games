const WordItem = ({ word }) => {
  return (
    <div className="WordItem">
      <span>{word}</span>
      <button className="remove-word-button">Remove</button>
    </div>
  );
};

export default WordItem;
