import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { withRouter } from 'react-router-dom';
// import Spinner from '../Spinner/Spinner';
import { AuthUserContext } from '../session';
import { withFirebase } from '../Firebase';
import { Button, Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      initLoginUser: {
        email: '',
        password: '',
        error: null
      },
      modal: false,
      loading: false
    };

    this.toggle = this.toggle.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
    this.userFormHandler = this.userFormHandler.bind(this);
  }

  userFormHandler(event) {
    const target = event.target;
    const name = target.name;
    const value =  target.value;
    const { initLoginUser } = this.state;
    this.setState({
      initLoginUser: {
        ...initLoginUser,
        [name]: value
      }
    });
    // console.log(event.target.value);
  }
 
  submitFormHandler(event) {
    this._isMounted = true;
    event.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ loading: true });

      const { email, password } = this.state.initLoginUser;
      this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log(authUser);
          this.setState({
            ...this.state.initLoginUser,
            loading: false,
            modal: false
          });
          this.props.history.push({ pathname: '/order' });
        })
        .catch(error => {
          this.setState({
            ...this.state.initLoginUser,
            initLoginUser: { error: error },
            loading: false,
            modal: true
          });
          console.log(error);
        });

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    <AuthUserContext.Consumer>
                    {authUser =>
                       authUser ? this.props.history.push({ pathname: '/order' }) : null
                    }
   </AuthUserContext.Consumer>
  }

  render() {
    const { initLoginUser } = this.state;
    let form = <Form onSubmit={this.submitFormHandler}>
                <span style={{color:'red'}}>{initLoginUser.error && <p>Invalid login credentials</p>}</span>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input name="email" type="text" value={initLoginUser.email}  onChange={this.userFormHandler} id="email" placeholder="name@email.com" />
                   <span style={{color:'red'}}>{this.validator.message('email', initLoginUser.email, 'required|email|regex')}</span>
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input type="password" name="password" value={initLoginUser.password} onChange={this.userFormHandler} id="Password" placeholder="********" />
                  <span style={{color:'red'}}>{this.validator.message('password', initLoginUser.password, 'required|min:7')}</span>
                </FormGroup>
                <Button outline color="secondary">Sign in</Button>
            </Form>;
    if(this.state.loading){
      form = <p>Loading...</p>;
    }
    return (
      <div>
         <Container>
         <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
             <h4  style={{color:"#7DCEA0", marginTop: "100px", marginBottom: "100px", textAlign: 'center',}}>Please Login!</h4>
          </Col>
         </Row>
         <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
           {form}
          </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default (withRouter(withFirebase(Login)));