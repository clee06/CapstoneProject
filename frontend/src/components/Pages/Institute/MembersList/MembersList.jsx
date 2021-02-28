import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { InputBase, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import "./MembersList.css";
import UserCard from "../UserCard/UserCard";
// ----------------------------------------------------------------------------------------------------------------
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  action: {
    backgroundColor: "#fff",
    color: "gray",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({}))(MuiDialogContent);

// ----------------------------------------------------------------------------------------------------------------

export default function MembersList(props) {
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
    e.target.value === "" && setFilter("");
  };

  const styles = useBorderedInputBaseStyles();
  const classes = useStyles();
  // ----------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <IconButton
        className={classes.action}
        onClick={handleClickOpen}
        classes={iconBtnStyles}
        style={{
          marginTop: "6px",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Add fontSize="large" />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <InputBase
            classes={styles}
            style={{
              width: "100%",
              margin: "2rem 0 0",
              color: "#fff",
              backgroundColor: "#343a40",
            }}
            placeholder={"Search users..."}
            startAdornment={<SearchIcon />}
            onChange={handleSearchChange}
          />
        </DialogTitle>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <DialogContent
          dividers
          id="customized-dialog-title"
          className={classes.container}
        >
          {props.user.map(
            (info) =>
              info.username.toLowerCase().includes(filter) && (
                <Grid container key={info.usersID}>
                  <Grid item xs={10}>
                    <UserCard picture={info.picture} username={info.username} />
                  </Grid>
                  <Grid item xs={2} style={{ paddingTop: "1.3rem" }}>
                    <IconButton
                      className={classes.action}
                      classes={iconBtnStyles}
                    >
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
              )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
