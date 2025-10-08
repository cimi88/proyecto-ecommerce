import React from "react";

export function Card({ children, className }) {
	return <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
	return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
	return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }) {
	return <div className={`${className}`}>{children}</div>;
}

export function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={`text-muted-foreground text-sm ${className}`}
      {...props}
    />
  )
}