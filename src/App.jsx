import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";

const blocksArr = [...Array(9)].map((_, i) => {
  const block = { filled: false };
  i + 1 === 5 && (block.hidden = true);
  return block;
});

export default function App() {
  const [blocks, setBlocks] = useState(blocksArr);
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
    if (order.length === blocks.length - 1) {
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
