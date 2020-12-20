import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import {
  CrossoverRateControl,
  MutationRateControl,
  NbIndividualsControl,
  UpdateRateControl,
} from "./components";

const useStyles = makeStyles((theme) => ({
  controlSectionTitle: {
    marginBottom: theme.spacing(1),
  },
}));

export const ConfigurationControls: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <Typography variant="h5" className={classes.controlSectionTitle}>
        Configuration
      </Typography>
      <UpdateRateControl />
      <NbIndividualsControl />
      <CrossoverRateControl />
      <MutationRateControl />
    </Box>
  );
};
