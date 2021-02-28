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
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import CloseIcon from "@material-ui/icons/Close";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";
import axios from "axios";
import { withRouter } from "react-router-dom";

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

 function CoursePopup(props) {
  const [open, setOpen] = useState(false);
  const styles = useBorderedInputBaseStyles();

  const [formData, setFormData] = useState({
    courseID: props.courseID,
    name: "",
    startdate: "",
    enddate: "",
  });
  const { name, startdate, enddate } = formData;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const btnStyles = useGraphicBtnStyles();

  const submitHandler = (event) => {
    axios
      .post("http://localhost:8080/newClass", formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };


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
        <form onSubmit={submitHandler}>
          <DialogContent dividers style={{ maxHeight: "65vh" }}>
          <Typography variant="h6" className={classes.title}>
        Classroom Name
      </Typography>
      <InputBase
        classes={styles}
        style={{
          width: "100%",
          backgroundColor: "#343a40",
        }}
        placeholder="max characters: 35"
        required
        inputProps={{ maxLength: 35 }}
        name="name"
        value={name}
        onChange={handleFormChange}
      />

      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1em",
        }}
      >
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Start Date
          </Typography>
          <InputBase
            type="date"
            name="startdate"
            value={startdate}
            classes={styles}
            style={{
              width: "100%",
              backgroundColor: "#343a40",
            }}
            onChange={handleFormChange}
            required
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            End Date
          </Typography>
          <InputBase
          name="enddate"
          value={enddate}
            type="date"
            classes={styles}
            style={{
              width: "100%",
              backgroundColor: "#343a40",
            }}
            onChange={handleFormChange}
            required
          />
        </Grid>
      </Grid>
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
      </Dialog>
    </div>
  );
}

export default withRouter(CoursePopup)