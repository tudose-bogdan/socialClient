import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
//Redux
import {connect} from 'react-redux'
import {editUserDetails} from '../../redux/actions/userActions'
//MUI Stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
//Icons 
import EditIcon from '@material-ui/icons/Edit'


const styles = () => ({
    palette: {
        primary: {
          light: '#33c9dc',
          main: '#00bcd4',
          dark: '#008394',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
        },
      },
      typography:{
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative',
        float: "right"
    },
    customError: {
        color:'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
  
})


class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    
    }

    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials);
    }

    
    handleClose = () => {
        this.setState({open:false});
    }

    componentDidMount(){
        const {credentials} = this.props;

        this.mapUserDetailsToState(credentials);
    }


    handleChange = (event) => {

        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
              
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
              <Dialog
               open={this.state.open}
               onClose={this.handleClose}
               fullWidth
               maxWidth="sm">
                 <DialogTitle>Edit your details</DialogTitle>
                 <DialogContent>
                     <form>
                         <TextField 
                           name="bio"
                           type="text"
                           label="Bio"
                           multiline
                           rows="3"
                           placeholder="A short description"
                           className = {classes.textField}
                           value = {this.state.bio}
                           onChange = {this.handleChange}
                           fullWidth
                           />

                          <TextField 
                           name="website"
                           type="text"
                           label="Website"
                           placeholder="Your website"
                           className = {classes.textField}
                           value = {this.state.website}
                           onChange = {this.handleChange}
                           fullWidth
                           />

                        <TextField 
                           name="location"
                           type="text"
                           label="Location"
                           
                           placeholder="Your adress"
                           className = {classes.textField}
                           value = {this.state.location}
                           onChange = {this.handleChange}
                           fullWidth
                           />

                     </form>
                 </DialogContent>
                 <DialogActions>
                     <Button onClick={this.handleClose} color="primary">
                         Cancel
                     </Button>

                     <Button onClick={this.handleSubmit} color="primary">
                         Submit
                     </Button>
                 </DialogActions>
               </Dialog>

            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
