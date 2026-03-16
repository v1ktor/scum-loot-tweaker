import React from "react";

export interface AlertProps {
  children: React.ReactNode;
}

export function Alert(props: AlertProps) {
  return (
    <div className="alert" role="alert">
      {props.children}
    </div>
  );
}
