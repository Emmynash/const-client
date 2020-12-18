import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { compose } from 'recompose';
import { withAuthorization } from '../session';


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

class EditOrder extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      updateData: {
        bookingDate: '',
        title: ''
      }
    }
     this.handleUpdateOrder = this.handleUpdateOrder.bind(this);
     this.updateOrderFormHandler = this.updateOrderFormHandler.bind(this);
  }

  UNSAFE_componentWillMount() {
    axios.get(`http://localhost:5000/orders/${this.props.match.params.uid}`)
      .then(res => {
        console.log(res);
        this.setState({
          data: res.data
        })
    })
  }
   updateOrderFormHandler(event) {
    const target = event.target;
    const name = target.name;
    const value =  target.value;
    const { updateData } = this.state;
    this.setState({
      updateData: {
        ...updateData,
        [name]: value
      }
    });
     
  }

  handleUpdateOrder(event) {
    event.preventDefault();
    const { title, bookingDate } = this.state.updateData;

    // convert date to unixTimeStamp
    const unixDate = new Date(bookingDate).getTime() / 1000

    console.log(bookingDate)
    console.log(unixDate);
    axios.put(`http://localhost:5000/orders/${this.props.match.params.uid}`, {
      title,
      unixDate
    })
      .then((res) => {
        console.log(res)
      return this.props.history.push({ pathname: '/order' });
      })
      .catch(err => {
      console.log("could not update order", err)
    })
    
  }
  render() {
    const { classes } = this.props;
    const { data, updateData } = this.state
    console.log(updateData.bookingDate);

      // convert unixTimestamp to human readable
    const milliseconds = data.bookingDate * 1000 
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString().split(',')[0]
    
  let form = <Form onSubmit={this.handleUpdateOrder}>
                <FormGroup>
                  <h5>Title</h5>
                  <Input name="title" type="text" value={updateData.title}  onChange={this.updateOrderFormHandler} id="title" placeholder={data.title}  />
                </FormGroup>
<               FormGroup>
                  <h5>Booking date</h5>
                  <Input name="book" type="text" value={updateData.bookingDate} onChange={this.updateOrderFormHandler} id="book" placeholder={humanDateFormat}/>
                </FormGroup>
                 <FormGroup>
                   <h5>Address</h5>
                  <Input disabled type="text" name="street" value={data.address ? data.address.street : ''} onChange={this.updateOrderFormHandler} id="street" /> <br />
                  <Input disabled type="text" name="city" value={`${data.address ? data.address.city : ''} ${data.address ? data.address.zip : ''}`} onChange={this.updateOrderFormHandler} id="city" /> <br />
                </FormGroup>
                 <FormGroup>
                   <h5>customer</h5>
                  <Input disabled type="text" name="name" value={data.customer ? data.customer.name : ''} onChange={this.updateOrderFormHandler} id="name" /> <br />
                  <Input disabled type="email" name="email" value={data.customer ? data.customer.email : ''} onChange={this.updateOrderFormHandler} id="email" /> <br />
                  <Input disabled type="number" name="phone" value={data.customer ? data.customer.phone : ''} onChange={this.updateOrderFormHandler} id="phone" />
                </FormGroup>
                <Button outline color="secondary">submit</Button>
            </Form>;
    if(this.state.loading){
      form = <p>Loading...</p>;
    }
        return(
          <div style={{ padding: '100px', height: "630px", alignContent: "center", alignItems: "center", }}>
              <span className={classes.paper}>
                <Typography variant="h4">
                  Edit Booking Details
                </Typography>
               </span>
            <Grid container spacing={8} alignItems="center">
               <Grid item xs={12}>
                {form}
             </Grid>
            </Grid>
          </div>
        );
    }
}
EditOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};
const condition = authUser => !!authUser;
export default compose(withStyles(styles), withAuthorization(condition)) (EditOrder);
