import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

const getBlocksArr = (config) => {
  return config.flat().map((el, i) => {
    const block = { filled: false };
    el === 0 && (block.hidden = true);
    return block;
  });
};

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

export default function App() {
  const [blocks, setBlocks] = useState(getBlocksArr(config));
  const [order, setOrder] = useState([]);
  const handleClick = (i) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[i].filled = true;
    setBlocks(updatedBlocks);
    setOrder([...order, i]);
  };

  const defill = (i) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBlocks = [...blocks];
        updatedBlocks[i].filled = false;
        setBlocks(updatedBlocks);
        resolve();
      }, 300);
    });
  };

  const loopDefil = async () => {
    if (order.length === config.flat().filter((el) => el).length) {
      const order2 = [...order];
      for (let i = order2.length - 1; i >= 0; i--) {
        await defill(order2.pop());
      }
      setOrder(order2);
    }
  };

  useEffect(() => {
    loopDefil();
  }, [order.length]);
  return (
    <div className="gridContainer">
      <div className="grid">
        {blocks.map((block, i) => {
          return (
            <div
              key={i}
              className={`block ${block.hidden ? "block--hidden" : ""} ${
                block.filled ? "block--filled" : ""
              }`}
              onClick={() => handleClick(i)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
