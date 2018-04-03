import React,{Component} from 'react';
import {FormErrors} from './FormErrors';



export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : '',
            lastname: '',
            zipcode: '',
            email: '',
            username:'',
            password:'',
            confirmPassword:'',
            formErrors:{email:'',username:'',password:'',confirmPassword:''},
            emailValid: false,
            usernameValid:false,
            passwordValid:false,
            confirmPasswordValid:false,
            formValid:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(event) {
            event.preventDefault();
            alert("Form Submitted Successfully !")
        }

    
            handleUserInput (e) {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value},
              ()=> {this.validateField(name,value)}  );
            }

            validateField(fieldName, value) {
                let fieldValidationErrors = this.state.formErrors;
                let emailValid = this.state.emailValid;
                let usernameValid = this.state.usernameValid;
                let passwordValid = this.state.passwordValid;
                let confirmPasswordValid = this.state.confirmPasswordValid;
                switch(fieldName) {
                  case 'email':
                    emailValid = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
                    fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                    break;

                    case 'username':
                    usernameValid = value.match(/^([a-zA-Z0-9]{3,15})$/i);
                    fieldValidationErrors.username = usernameValid ? '': 'is invalid';
                    break; 

                    case 'password':
                    passwordValid = value.length >= 6;
                    fieldValidationErrors.password = passwordValid ? '': ' is too short';
                    break;

                    case 'confirmPassword':
                    if(this.state.confirmPassword===this.state.password){
                        fieldValidationErrors.confirmPassword = '';
                    }
                    else{
                        fieldValidationErrors.confirmPassword = 'Mismatch';
                    }
                    break;
                    default:
                    break;
                }
                this.setState({formErrors: fieldValidationErrors,
                                emailValid: emailValid,
                                usernameValid: usernameValid,
                                passwordValid: passwordValid,
                                confirmPasswordValid1: confirmPasswordValid
                              }, this.validateForm);
              }
              
              validateForm() {
                this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid
                    && this.state.confirmPasswordValid});
              }

    render() {
        return(
            <div className = "form">
                <h2>Register</h2>
                <h5>Join the community and improve your game <br/>with ANGLR</h5>
                <form onSubmit = {this.handleSubmit}>


                <label><span className="fa fa-user"></span><input type = "text" name = "firstname" pattern="[A-Za-z]{3,15}" placeholder = "First Name" 
                value = {this.state.firstname} onChange = {(event) => this.handleUserInput(event)} /> </label>

                <label><span className="fa fa-user"></span><input type = "text" name = "lastname" pattern="[A-Za-z]{3,15}" placeholder = "Last Name"    
                value = {this.state.lastname} onChange = {(event) => this.handleUserInput(event)} /> </label>

                <label><span className="fa fa-map-marker"></span>
                <input type = "text" name = "zipcode" pattern="[0-9]{6}" placeholder = "Zip Code" 
                value = {this.state.zipcode} onChange = {(event) => this.handleUserInput(event)} /> 
                </label>

                <label><span className="fa fa-envelope"></span>
                <input type = "email" name = "email" placeholder = "Email ID" 
                value = {this.state.email} onChange = {(event) => this.handleUserInput(event)}  />
                {(this.state.email.length > 0 && !this.state.emailValid)?<i className="fa fa-warning warningstyles"></i>:''}
                 </label>

                <label><span className="fa fa-user"></span>
                <input type = "text" name = "username" placeholder = "User Name" 
                value = {this.state.username} onChange = {(event) => this.handleUserInput(event)} />
                {(this.state.username.length > 0 && !this.state.usernameValid)?<i className="fa fa-warning warningstyles"></i>:''} </label>

                <label><span className="fa fa-lock"></span><input type = "password" name = "password" placeholder = "Password" 
                value = {this.state.password} onChange = {(event) => this.handleUserInput(event)} />
                {(this.state.password.length > 0 && !this.state.passwordValid)?<i className="fa fa-warning warningstyles"></i>:''} </label>

                <label><span className="fa fa-lock"></span><input type = "password" name = "confirmPassword" placeholder = "Confirm Password" 
                value = {this.state.confirmPassword} onChange = {(event) => this.handleUserInput(event)}/>
                {(this.state.confirmPassword.length > 0 && !this.state.confirmPasswordValid)?<i className="fa fa-warning warningstyles"></i>:''} </label>

                <h5>By registering you agree to <br/> our Terms and Privacy Policy</h5>

                    <div className="error">
                    <FormErrors formErrors={this.state.formErrors} />
                    </div>

                <input type = "submit" className="button" value="Register"/>

                <hr className="line"/>

                <h5>Already have an account? <strong>SIGN IN</strong></h5>
            

                </form>
            </div>
        );
    }
}
