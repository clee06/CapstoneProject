import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import CloseIcon from "@material-ui/icons/Close";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";
import axios from "axios";

const styles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  createButton: {
    background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
    title: {
      marginTop: "1em",
      fontWeight: 300,
      fontSize: "2em",
    },
  },
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// ------------------------------------------------------------------------------------------------------------------

export default function InstitutePopup(props) {
  const [open, setOpen] = useState(false);
  const styles = useBorderedInputBaseStyles();

  const [formData, setFormData] = useState({
    name: "",
    overview: "",
    picture: "",
  });
  const { name, overview, picture } = formData;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const btnStyles = useGraphicBtnStyles();

  // -------------------------------------------- AXIOS ------------------------------------------------
  const submitHandler = (event) => {
    console.log(formData);
    axios
      .post("http://localhost:8080/newInst", formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  // ---------------------------------------------------------------------------------------------------
  return (
    <div>
      <Button
        className={classes.createButton}
        classes={btnStyles}
        variant={"contained"}
        color={"primary"}
        disableRipple
        onClick={handleClickOpen}
      >
        {props.buttonName}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: 500, fontSize: "2.5em" }}
          >
            {props.title}
          </Typography>
        </DialogTitle>
        {/* ----------------------------------------- FORM ----------------------------------------------------- */}
        <form onSubmit={submitHandler}>
          <DialogContent dividers style={{ maxHeight: "65vh" }}>
            <Typography variant="h6" className={classes.title}>
              Institution Name
            </Typography>
            <InputBase
              classes={styles}
              name="name"
              style={{
                width: "100%",
                backgroundColor: "#343a40",
              }}
              placeholder="max characters: 35"
              required
              inputProps={{ maxLength: 35 }}
              onChange={handleFormChange}
              value={name}
            />

            <Typography variant="h6" className={classes.title}>
              Institution Description
            </Typography>
            <InputBase
              name="overview"
              classes={styles}
              style={{
                width: "100%",
                backgroundColor: "#343a40",
              }}
              multiline
              rows={5}
              rowsMax={10}
              required
              placeholder="max characters: 180"
              inputProps={{ maxLength: 180 }}
              onChange={handleFormChange}
              value={overview}
            />

            <Typography variant="h6" className={classes.title}>
              Image URL
            </Typography>
            <InputBase
              classes={styles}
              name="picture"
              style={{
                width: "100%",
                backgroundColor: "#343a40",
              }}
              onChange={handleFormChange}
              value={picture}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.createButton}
              classes={btnStyles}
              variant={"contained"}
              color={"primary"}
              disableRipple
              type="submit"
            >
              Create
            </Button>
          </DialogActions>
        </form>
        {/* -------------------------------------------------------------------------------------------------------- */}
      </Dialog>
    </div>
  );
}
