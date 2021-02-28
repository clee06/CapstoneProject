import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import UserTabs from "./UserTabs";
import ContactsIcon from "@material-ui/icons/Contacts";
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
    height: "80vh",
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  // ----------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <ContactsIcon
        fontSize="large"
        onClick={handleClickOpen}
        style={{
          marginTop: "12px",
          transition: "0.2s",
          cursor: "pointer",
        }}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User List
        </DialogTitle>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <DialogContent
          dividers
          id="customized-dialog-title"
          className={classes.container}
        >
          <UserTabs
            students={props.students}
            teachers={props.teachers}
            admins={props.admins}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
