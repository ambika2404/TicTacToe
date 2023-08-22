import "./App.css";

export default function Square({ val, chooseSquare }) {
  console.log(111);
  console.log(val);
  console.log(chooseSquare);
  return (
    <div className="square" onClick={chooseSquare}>
      {val}
    </div>
  );
}
