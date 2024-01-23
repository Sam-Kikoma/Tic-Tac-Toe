import React, { useState, useEffect } from "react";
import "./style.css";

const Square = ({ value, onClick }) => {
	return (
		<>
			<button onClick={onClick}>{value}</button>
		</>
	);
};

const Grid = () => {
	const [turn, setTurn] = useState(false);
	const [values, setValues] = useState(Array(9).fill(""));
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		// Check for a winner after each move
		checkWinner();
	}, [values]);

	const checkWinner = () => {
		// Define winning combinations
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const combination of winningCombinations) {
			const [a, b, c] = combination;
			if (values[a] && values[a] === values[b] && values[a] === values[c]) {
				setWinner(values[a]);
				return;
			}
		}

		// Check for a tie
		if (!values.includes("") && !winner) {
			setWinner("Tie");
		}
	};

	const handleClick = (index) => {
		if (values[index] === "" && !winner) {
			const newValues = [...values];
			newValues[index] = turn ? "O" : "X";
			setValues(newValues);
			setTurn(!turn);
		}
	};

	const renderSquare = (index) => {
		return <Square value={values[index]} onClick={() => handleClick(index)} />;
	};

	return (
		<div className="container">
			{renderSquare(0)}
			{renderSquare(1)}
			{renderSquare(2)}
			{renderSquare(3)}
			{renderSquare(4)}
			{renderSquare(5)}
			{renderSquare(6)}
			{renderSquare(7)}
			{renderSquare(8)}

			{winner && <div className="winner-message">{winner === "Tie" ? "It's a Tie!" : `Player ${winner} wins!`}</div>}
		</div>
	);
};

const App = () => {
	return (
		<>
			<h1>Game Time</h1>
			<Grid />
		</>
	);
};

export default App;
