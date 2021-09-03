import "./App.css";
import React from "react";
import TimeInput from "./components/time/TimeInput";

function App() {
  const [times, setTimes] = React.useState(["00:00", "00:00"]);
  const counter = React.useRef(2);
  console.log(times);

  function addTime(values) {
    if (!values || values.length < 2 || values.some((item) => !item)) {
      return [];
    }
    const timeArrays = values.map((item) =>
      item.split(":").map((v) => Number.parseInt(v))
    );
    const resultArr = [
      timeArrays.map((item) => item[0]).reduce((acc, item) => acc + item, 0),
      timeArrays.map((item) => item[1]).reduce((acc, item) => acc + item, 0),
    ];
    if (resultArr[1] > 59) {
      resultArr[0] += 1;
      resultArr[1] = resultArr[1] - 60;
    }
    if (resultArr[0] > 23) {
      console.log("more than day");
      resultArr[0] = resultArr[0] - 24;
    }
    return `${resultArr[0].toString().padStart(2, "0")}:${resultArr[1]
      .toString()
      .padStart(2, "0")}`;
  }

  const clearHandler = () => {
    const clearValues = times.fill("00:00");
    setTimes([...clearValues]);
  };

  const updateTimeArray = (index, value) => {
    const arr = [...times];
    arr.splice(index, 1, value);
    return arr;
  };

  const addHandler = () => {
    counter.current++;
    setTimes([...times, "00:00"]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TimeInput
          value={times[0]}
          onChange={(e) => setTimes(updateTimeArray(0, e.target.value))}
        />
        {times.map((element, index) => {
          console.log(element, index);
          if (index === 0) {
            return null;
          }
          return (
            <TimeInput
              key={`Input_${index}`}
              value={element}
              onChange={(e) => setTimes(updateTimeArray(index, e.target.value))}
            >
              <span>+</span>
            </TimeInput>
          );
        })}
        <TimeInput value={addTime(times)} readOnly onChange={()=> {}}>
          <span>=</span>
        </TimeInput>
        <br />
        <div>
          <button onClick={addHandler}>Add</button>
          <button onClick={clearHandler}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
