import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import {Button} from '@material-ui/core';

import image from '../../assets/images/404.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 400
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
   button: {
    margin: theme.spacing.unit,
    color: '#7DCEA0',
  },
  
});

class ErrorPageContainer extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <div style={{backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", padding: '50px', height: "630px"}}>
                <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <span className={classes.paper}>
                                 <Typography variant="h4" style={{color: "#7DCEA0"}} gutterBottom>
                                   <NavLink style={{textDecoration: "none"}} to='/'><Button  to="/" style={{color: "#7DCEA0"}} color="primary"><h4>Go Back Home!</h4></Button></NavLink>
                                 </Typography>
                            </span>
                        </Grid> 
                    </Grid> 
                <Grid />
            </div>
        );
    }
}
ErrorPageContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)) (ErrorPageContainer);
