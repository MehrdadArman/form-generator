import React from "react";
import { Card as MuiCard, type CardProps as MuiCardProps } from "@mui/material";

interface CardProps extends MuiCardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, sx, ...props }) => {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        ...sx,
      }}
    >
      {children}
    </MuiCard>
  );
};

export default Card;
