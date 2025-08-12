import React from 'react'
import './Loading.css'


type LoadingProps = {
  text?: string;
  fullScreen?: boolean;
};

const Loading = (props: LoadingProps) => {
  const { text = "Loading...", fullScreen = true } = props;

  return (
    <div
      className={fullScreen ? "loading-overlay" : "loading-inline"}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
        <div className="loading-spinner" />
        <span className="loading-text">{text}</span>
    </div>
  );
};

export default Loading