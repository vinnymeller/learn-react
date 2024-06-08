import React from "react";

interface SquareProps {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return <button className="square" onClick={onSquareClick}>{value}</button>;

}
export default Square;
//export default function Square({ value }: SquareProps) {
//  return <button className="square">{value}</button>;
//}

