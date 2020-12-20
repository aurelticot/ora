import React, { useCallback } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useEvolution } from "hooks";
import { EvolutionActionType } from "types";

const useStyles = makeStyles((theme) => ({
  controlSectionTitle: {
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export const EvolutionControls: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { isRunning, dispatch } = useEvolution();

  const handleStart = useCallback(() => {
    dispatch({ type: EvolutionActionType.START });
  }, []);

  const handleStop = useCallback(() => {
    dispatch({ type: EvolutionActionType.STOP });
  }, []);

  const classes = useStyles();
  return (
    <Box className={className}>
      <Typography variant="h5" className={classes.controlSectionTitle}>
        Evolution
      </Typography>
      <Box className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};
