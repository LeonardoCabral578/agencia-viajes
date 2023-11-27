"use client";
import { useEffect, useRef } from "react";

export interface IconProps {
  icon: string;
  type?: "fa_icon" | "svg_icon";
  size?: string;
  size_height?: string;
  color?: string;

  className?: string;
  onClick?: () => void;
}

export const Icon = ({
  icon,
  type,
  size,
  size_height,
  color,
  className,
  onClick,
}: IconProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && icon) {
      spanRef.current.innerHTML = icon;
    }
  }, [icon]);

  return type === "svg_icon" ? (
    <span
      className={`svg_icon ${className}`}
      ref={spanRef}
      style={{ fill: color, width: size, height: size_height }}
    />
  ) : (
    <div className="elv-icon">
      <i
        className={`fa_icon ${icon} ${className}`}
        style={{ fontSize: size, color: color }}
        onClick={() => {
          onClick && onClick();
        }}
      />
    </div>
  );
};
