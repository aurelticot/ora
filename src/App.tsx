import React, { useState, useCallback } from "react";
import { Box, Drawer, Fab, makeStyles } from "@material-ui/core";
import {
  NavigateNextRounded as OpenIcon,
  NavigateBeforeRounded as CloseIcon,
} from "@material-ui/icons";
import { EvolutionProvider } from "contexts";
import { ControlsSection, DisplaySection } from "./sections";

const drawerWidth = 370;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  controlSection: {
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  displayContainer: {
    width: "100%",
    height: "100vh",
    position: "relative",
  },
  drawerButton: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}));

export const App: React.FunctionComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerButtonClick = useCallback(() => {
    setDrawerOpen((state) => !state);
  }, []);

  const classes = useStyles();
  return (
    <EvolutionProvider>
      <Box className={classes.root}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <ControlsSection className={classes.controlSection} />
        </Drawer>
        <Box className={classes.displayContainer}>
          <DisplaySection />
          <Fab
            color="default"
            onClick={handleDrawerButtonClick}
            size="small"
            className={classes.drawerButton}
          >
            {drawerOpen ? <CloseIcon /> : <OpenIcon />}
          </Fab>
        </Box>
      </Box>
    </EvolutionProvider>
  );
};
