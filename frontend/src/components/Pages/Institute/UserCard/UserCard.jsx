import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import { Info, InfoTitle } from "@mui-treasury/components/info";
import { useChatzInfoStyles } from "@mui-treasury/styles/info/chatz";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
  },
}));

export default function UserCard(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.picture} alt="profile" />
        </ListItemAvatar>
        <Info useStyles={useChatzInfoStyles}>
          <InfoTitle>@{props.username}</InfoTitle>
        </Info>
      </ListItem>
    </List>
  );
}
