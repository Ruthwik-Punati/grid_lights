import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
];

export default function App() {
  const [order, setOrder] = useState([]);

  const deactivateCells = () => {
    const timer = setInterval(() => {
      setOrder((orgOrder) => {
        const newOrder = orgOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
        }
        return newOrder;
      });
    }, 300);
  };

  const handleClick = (i) => {
    const newOrder = [...order, i];
    setOrder(newOrder);

    if (newOrder.length === config.flat().filter((el) => el).length) {
      deactivateCells();
    }
  };

  return (
    <div className="gridContainer">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat().map((el, i) => {
          if (el === 0) return <span key={i}></span>;
          return (
            <div
              key={i}
              className={`block ${order.includes(i) ? "block--filled" : ""}`}
              onClick={() => handleClick(i)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
