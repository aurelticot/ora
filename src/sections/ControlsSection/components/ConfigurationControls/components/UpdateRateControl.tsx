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

const maxUpdateRate = 30000;
const marks = [
  {
    value: 1,
    label: `1s`,
  },
  {
    value: 5,
    label: `5s`,
  },
  {
    value: 10,
    label: `10s`,
  },
  {
    value: 15,
    label: `15s`,
  },
  {
    value: 20,
    label: `20s`,
  },
  {
    value: 25,
    label: `25s`,
  },
  {
    value: 30,
    label: `30s`,
  },
];

export const UpdateRateControl: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { configuration, dispatch } = useEvolution();
  const [value, setValue] = useState(configuration.updateRate / 1000);

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
          updateRate: (newValue as number) * 1000,
        },
      },
    });
  };

  const classes = useStyles();
  return (
    <Box className={`${className ? className : ""} ${classes.root}`}>
      <Typography>Update rate</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        min={0}
        step={0.5}
        max={maxUpdateRate / 1000}
        marks={marks}
        valueLabelDisplay="on"
        track={false}
        className={classes.slider}
      />
    </Box>
  );
};
