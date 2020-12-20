import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import {
  ConditionsControls,
  ConfigurationControls,
  EvolutionControls,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  controlSection: {
    padding: theme.spacing(3),
  },
}));

export const ControlsSection: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} ${className ? className : ""}`}>
      <EvolutionControls className={classes.controlSection} />
      <ConditionsControls className={classes.controlSection} />
      <ConfigurationControls className={classes.controlSection} />
    </Box>
  );
};
