import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios'
import { compose } from 'recompose';
import { NavLink } from 'react-router-dom'
import { orderEnpoint } from '../../utils';
import { withAuthorization } from '../session';
import image from '../../assets/images/edit-ic.png'


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

class Order extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  UNSAFE_componentWillMount() {
    axios.get(orderEnpoint)
      .then(res => {
        this.setState({
          data: res.data
        })
    })
  }
  render() {
    const {data} = this.state
    const { classes } = this.props;
        return(
          <div style={{ padding: '100px', height: "630px", alignContent: "center", alignItems: "center", }}>
              <span className={classes.paper}>
                <Typography variant="h4">
                  Booking Details
                </Typography>
               </span>
            <Grid container spacing={8} alignItems="center">
               <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Booking Date</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Customer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {data.map((data) => {
                        // convert unixTimestamp to human readable
                        const milliseconds = data.bookingDate * 1000 
                        const dateObject = new Date(milliseconds)
                         const humanDateFormat = dateObject.toLocaleString().split(',')[0]
                        return (
                        <TableRow key={data.uid}>
                          <TableCell component="th" scope="row">
                            {data.title}
                          </TableCell>
                          <TableCell>{humanDateFormat}</TableCell>
                          <TableCell>{data.address ? data.address.street : null}</TableCell>
                          <TableCell>{data.customer ? data.customer.name : null}</TableCell>
                          <TableCell><NavLink style={{textDecoration: "none"}} to={`/order/${data.uid}/edit`} ><img src={image} height='30'  width='30' alt="Edit icon" name="Edit icon" /></NavLink></TableCell>
                        </TableRow>
                      )})}
                  </TableBody>
                </Table>
              </TableContainer>
             </Grid>
            </Grid>
          </div>
        );
    }
}
Order.propTypes = {
    classes: PropTypes.object.isRequired,
};
const condition = authUser => !!authUser;
export default compose(withStyles(styles), withAuthorization(condition)) (Order);
