import { Button } from "@mui/material";
import React from "react";

export interface IAnswerButton {
  label: string;
  classname?: string;
  buttonLabel: string;
  onClick?: () => void;
}

export default function AnswerButton({
  label,
  buttonLabel,
  classname,
  onClick,
}: IAnswerButton) {
  return (
    <div
      className={
        "answer-btn flex items-center justify-center " +
        `${classname ? classname : ""}`
      }
    >
      <p className="answer-btn__label mr-4">{label}</p>
      <Button
        variant="text"
        onClick={() => {
          onClick && onClick();
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
