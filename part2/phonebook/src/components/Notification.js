import React from "react";

const Notification = ({ className, message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={className} role="alert">
      {message}
    </div>
  );
};

export default Notification;
