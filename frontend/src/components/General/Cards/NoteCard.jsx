// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: "200px",
    margin: "10px",
  },
  bullet: {
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function NoteCard() {

    const classes = useStyles();

    const cardData = [
      {noteTitle: "Javascript Arrays", content: "The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array."},
      {noteTitle: "Javascript String", content: "Strings are characters wrapped in single and double quotations"},
      {noteTitle: "Javascript Objects", content: "Objects include data in key-value pairs"}
    ];
   
    return (
        <div>        
             <Card className={classes.root} variant="outlined">
                <CardContent>
                    {/* pull title (name?) data from DB and insert below */}
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Javascript Arrays
                    </Typography>
                    {/* Pull text data from DB and insert below */}
                    <Typography variant="body2" component="p">
                        The concat() method is used to merge two or more arrays. 
                        
                        This method does not change the existing arrays, but instead returns a new array.
                    </Typography>

                </CardContent>
              </Card>          
        </div>
    )
}
