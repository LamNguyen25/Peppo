import React, { useState } from 'react';
// Material UI Stuffs
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import auth from '../Services/apiService';
import { phoneValidator } from '../validation/PhoneValidation';
import http from '../Services/httpService'
import { apiUrl } from "../config.json";
const apiGetAccessCode  = apiUrl + "/login/createNewAccessCode";


const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        margin: theme.spacing(1),
        alignItems: 'center',
        backgroundColor: '#4EA69E',
    },
    form: {
        margin: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    notification: {
        color: 'blue',
        fontSize: 12,
    },
}))

export default function Login() {
    const classes = useStyles();

    // Input from user
    const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
    // Entered Access Code
    const [accessCode, setAccessCode] = useState({ value: "", error: "" });
    // Open pop-up window
    const [open, setOpen] = useState(false);
    // Resend access Code message
    const [notification, setNotification] = useState("");

    const handleChangePhoneNumber = event => {
        setPhoneNumber({ value: event.target.value, error: ""});
    }

    const handleChangeAccessCode = event => {
        setAccessCode({ value: event.target.value, error: ""});
    }
    const handleSubmitPhoneNumber = async (event) => {
            event.preventDefault();
            const phoneNumberError = phoneValidator(phoneNumber.value);

            if(phoneNumberError) {
                setPhoneNumber({...phoneNumber, error: phoneNumberError});
                return;
            }
            // var temp = phoneNumber.value
            // const data = await http.post(apiGetAccessCode, { temp });
            // console.log(data);
            
            auth.getAccessCode(phoneNumber.value)
                .then((data) => {
                    // console.log(data);
                    var token = auth.getCurrentUser();
                    console.log("Cur:", token);
                    setOpen(true);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
    }

    const resendAccessCode_Handler = async (event) => {
        event.preventDefault();
        auth.getAccessCode(phoneNumber.value)
            .then(() => {
                setNotification("A new access code has been sent to yout phone")
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }
    const handleSubmitAccessCode = (event) => {
        event.preventDefault();
        setNotification("");
        auth.validateAccessCode(phoneNumber.value, accessCode.value)
        .then((data) => {
            var message = data.data.message;
            console.log(message)
            if(message == 'true') {
                setOpen(false);      
                // Redirect home Page
                window.location = "/home";


            } else {
                setAccessCode({...accessCode, error: "Wrong Access Code! Please try again"})
            }
            
        })
        .catch(function(error) {

            console.error("Error writing document: ", error);
        });

    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container component="main" maxWidth='xs'>
            <CssBaseline />
            <div className={classes.box}>
                <Avatar className={classes.icon}>
                    <SmartphoneIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography component="subtitle1" variant="h6">
                    Please Enter Your Phone Number
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        value={phoneNumber.value}
                        onChange={handleChangePhoneNumber}
                        helperText="E.g. 3109994567"
                    />
                
                    {phoneNumber.error ? <Typography component="p" className={classes.error}>{phoneNumber.error}</Typography> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmitPhoneNumber} 
                    >
                        Submit
                    </Button>
                </form>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Please Enter 6-digit Access Code
                    </DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            An access code has been sent to your phone
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Access Code"
                            value={setAccessCode.value}
                            onChange={handleChangeAccessCode}
                        />
                        {accessCode.error ? <Typography component="p" className={classes.error}>{accessCode.error}</Typography> : null}
                        {notification ? <Typography component="p" className={classes.notification}>{notification}</Typography> : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resendAccessCode_Handler} color="primary">
                            Resend
                        </Button>
                        <Button onClick={handleSubmitAccessCode} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    )
}