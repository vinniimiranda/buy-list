import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@material-ui/core";

import {
  Menu,
  List as ListIcon
} from "@material-ui/icons";
import history from "../../services/history";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Navigation () {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const routeList = [
    {
      text: "Listas",
      icon: <ListIcon color="primary" />,
      path: "/",
    },

  ];

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="2rem"
      >

      </Box>
      <List>
        {routeList.map((item, index) => (
          <ListItem
            key={item.text}
            selected={history.location.pathname === item.path}
            onClick={() => history.push(item.path)}
            button
            style={{ padding: ".75rem" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box padding="1rem 0  0 2rem ">
      <IconButton onClick={toggleDrawer("left", true)}>
        <Menu color="primary" />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </Box>
  );
}
