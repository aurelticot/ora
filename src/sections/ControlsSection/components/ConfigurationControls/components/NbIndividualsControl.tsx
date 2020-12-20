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

export const NbIndividualsControl: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { configuration, dispatch } = useEvolution();
  const [value, setValue] = useState(configuration.nbIndividuals);

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: number | number[]
  ) => {
    setValue((newValue as number) * (newValue as number));
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
          nbIndividuals: (newValue as number) * (newValue as number),
        },
      },
    });
  };

  const classes = useStyles();
  return (
    <Box className={`${className ? className : ""} ${classes.root}`}>
      <Typography>Number of individuals</Typography>
      <Slider
        value={Math.round(Math.sqrt(value))}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        min={4}
        step={1}
        max={30}
        scale={(x) => x * x}
        valueLabelDisplay="on"
        track={false}
        className={classes.slider}
      />
    </Box>
  );
};
