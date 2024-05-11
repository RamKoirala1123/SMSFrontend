import React, { useState, useEffect } from "react";

const CircleAnimation = (props) => {
  const [visible, setVisibility] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? (
    <div className="loading-anim">
      <svg height="100" width="100">
        <circle className="circle" cx="50" cy="50" r="40" />
      </svg>
    </div>
  ) : (
    <></>
  );
};

export default CircleAnimation;
