"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface CardServiceProps {
  topTitle: string;
  title: string;
  subTitle: string;
  desc?: string;
  onClick: () => void;
}

const CardService = ({
  topTitle,
  title,
  subTitle,
  desc,
  onClick,
}: CardServiceProps) => {
  return (
    <Box>
      <Card variant="outlined" className="bg-blue-100">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {topTitle}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subTitle}
          </Typography>
          <Typography variant="body2">{desc}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              onClick();
            }}
          >
            Ver más
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardService;
