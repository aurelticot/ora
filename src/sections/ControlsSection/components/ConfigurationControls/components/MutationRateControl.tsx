import React, { useState } from "react";
import { Box, makeStyles, Slider, Typography } from "@material-ui/core";
import { useEvolution } from "hooks";
import { EvolutionActionType } from "types";

const useStyles = makeStyles((theme) => ({
  root: {},
  slider: {
    marginTop: theme.spacing(5),
  },
}));

export const MutationRateControl: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { configuration, dispatch } = useEvolution();
  const [value, setValue] = useState(configuration.mutationRate);

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number);
  };

  const handleCommit = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: number | number[]
  ) => {
    dispatch({
      type: EvolutionActionType.UPDATE_CONFIGURATION,
      payload: {
        configuration: {
          ...configuration,
          mutationRate: newValue as number,
        },
      },
    });
  };

  const classes = useStyles();
  return (
    <Box className={`${className ? className : ""} ${classes.root}`}>
      <Typography>Mutation rate</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        min={0}
        step={0.05}
        max={1}
        valueLabelDisplay="on"
        track={false}
        className={classes.slider}
      />
    </Box>
  );
};
