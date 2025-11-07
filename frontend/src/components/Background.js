import React from "react";
import "./Background.css"; // we’ll create this next

const Background = () => {
  return (
    <div className="bubbles">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
      
      {/* Stars */}
      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="star star4"></div>
      <div className="star star5"></div>
      <div className="star star6"></div>
    </div>
  );
};

export default Background;
