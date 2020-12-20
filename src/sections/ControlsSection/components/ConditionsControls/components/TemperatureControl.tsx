import React, { useState } from "react";
import { Box, makeStyles, Slider, Typography } from "@material-ui/core";
import {
  maxTemperatureThreshold,
  maxTemperature,
  minTemperature,
  minTemperatureThreshold,
} from "lib/evolution";
import { useEvolution } from "hooks";
import { EvolutionActionType } from "types";

const useStyles = makeStyles((theme) => ({
  root: {},
  slider: {
    marginTop: theme.spacing(5),
  },
}));

const temperatureMarks = [
  {
    value: minTemperature,
    label: `${minTemperature}°C`,
  },
  {
    value: minTemperatureThreshold,
    label: `${minTemperatureThreshold}°C`,
  },
  {
    value: maxTemperatureThreshold,
    label: `${maxTemperatureThreshold}°C`,
  },
  {
    value: maxTemperature,
    label: `${maxTemperature}°C`,
  },
];

export const TemperatureControl: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { conditions, dispatch } = useEvolution();
  const [value, setValue] = useState(conditions.temperature);

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
      type: EvolutionActionType.UPDATE_CONDITIONS,
      payload: {
        conditions: {
          ...conditions,
          temperature: newValue as number,
        },
      },
    });
  };

  const classes = useStyles();
  return (
    <Box className={`${className ? className : ""} ${classes.root}`}>
      <Typography>Temperature</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        min={minTemperature}
        max={maxTemperature}
        marks={temperatureMarks}
        valueLabelDisplay="on"
        track={false}
        className={classes.slider}
      />
    </Box>
  );
};
