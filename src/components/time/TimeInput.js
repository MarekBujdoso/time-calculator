import React from "react";

const TimeInput = (props) => {
  return (
    <div>
      {props.children}
      <input type="time" value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default TimeInput;
