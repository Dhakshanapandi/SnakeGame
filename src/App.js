import React, { useState, useEffect, useRef } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useInterval } from "./useInterval";

import "./App.css"

import {
  BOARD_SIZE,
  APPLE_START_POINT,
  SCALE,
  SNAKE_START_POINT,
  SNAKE_SPEED,
  DIRECTIONS,
} from "./constants";

function App() {
  const canvasRef = useRef();

  const [snake, setSnake] = useState(SNAKE_START_POINT);
  const [apple, setApple] = useState(APPLE_START_POINT);
  const [dir, setDir] = useState([0, -1]);
  const [SPEED, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score,setScore] = useState(0);
  const [showscore,setshowscore] = useState(false);
  const [startagain,setagain] = useState(false)


  const startGame = () => {
          setSnake(SNAKE_START_POINT);
          setApple(APPLE_START_POINT);
          setDir([0,-1]);
          setSpeed(SNAKE_SPEED);
          setGameOver(false)
          setScore(0)
  };

  const stopGame = () => {
    setshowscore(true)
    setSpeed(null);
    setGameOver(true);
    setagain(true)
    
    
    
  };

  const movieSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const createApple = () => 
  apple.map((_,i) => Math.floor(Math.random() * (BOARD_SIZE[i]) / SCALE))
   

  const checkCollision = (piece,snk = snake) => {
     if(
      piece[0] * SCALE >= BOARD_SIZE[0] || 
      piece[0] < 0 ||
      piece[1] * SCALE >= BOARD_SIZE[1] || 
      piece[1] < 0
     )
     return true
    
     for(const segment of snk){
      if(piece[0] === segment[0] && piece[1] === segment[1]) return true
     }

    return false 
  };
  const checkAppleCollision = (newSnake) => {
    if(newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]){
      let newApple = createApple();
      setScore(score + 5)
      while(checkCollision(newApple,newSnake)){
        newApple = createApple();
        
      }
      setApple(newApple)
      return true 
    }
    return false
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));

    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

    snakeCopy.unshift(newSnakeHead);
    if(checkCollision(newSnakeHead)) stopGame();
    if(!checkAppleCollision(snakeCopy)) snakeCopy.pop()
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, BOARD_SIZE[0], BOARD_SIZE[1]);
    context.fillStyle = "red";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "blue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval(()=>gameLoop(),SPEED)

  return (
    <>
 
    <div role="button" tabIndex={0} onKeyDown={(e) => movieSnake(e)}>
      <canvas
        style={{ border: "2px solid brown" }}
        ref={canvasRef}
        width={`${BOARD_SIZE[0]}px`}
        height={`${BOARD_SIZE[1]}px`}
      />
      <div className="container1">
      <button onClick={startGame} className="btn btn-success">{startagain ? "Start Again" : "Start Game"}</button>
       <br/> <br/>
        <div className="container2">
      {gameOver && <div>Game Over ! <br/> </div>}
      {showscore && <div>Your Score is {score}</div>}
      </div>
      </div>
    </div>
        </>
  );
}

export default App;
