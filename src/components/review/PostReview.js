import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
//Redux
import {connect} from 'react-redux'
import {editUserDetails} from '../../redux/actions/userActions'
import {postReview, clearErrors } from '../../redux/actions/dataActions'
//MUI Stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

//Icons 
import EditIcon from '@material-ui/icons/Edit'
import theme from '../../util/theme'

const styles = theme => ({
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
        position: 'relative'
    },
    customError: {
        color:'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    submitButon:{
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpiner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left:'91%',
        top:'6%'
    }
})

class PostReview extends Component {

        state={
            open: false,
            body: '',
            errors: {}
        };

        componentWillReceiveProps(nextProps) {
            if (nextProps.UI.errors) {
              this.setState({
                errors: nextProps.UI.errors
              });
            }
            if (!nextProps.UI.errors && !nextProps.UI.loading) {
              this.setState({ body: '', open: false, errors: {} });
            }
          }

        handleOpen = () => {
            this.setState({ open: true})
        }

        handleClose = () => {
            this.props.clearErrors();
            this.setState({open: false, errors:{}})
        }

        handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
          };

          handleSubmit = (event) => {
            event.preventDefault();
            this.props.postReview({ body: this.state.body });
          };

        render(){
            const {erorrs} = this.state;
            const {classes, UI:{loading}} = this.props;
            return (
                <Fragment>
                    <MyButton onClick={this.handleOpen} tip="Post a review!">
                        <AddIcon />
                    </MyButton>
                    <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                        <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                            <CloseIcon/>
                        </MyButton>
                        <DialogTitle>Post a new review</DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField name="body" type="text" label="Review" multiline rows="3" placeholder="Review time" error={this.state.errors.body ? true : false} helperText={this.state.errors.body} className={classes.textField} onChange={this.handleChange} fullWidth/>
                                <Button type="submit" variant="contained" color="primary"
                                    className={classes.submitButon} disabled={loading}>
                                        Submit
                                      {loading && (
                                          <CircularProgress size={30} className={classes.progressSpiner}/>
                                      )}  

                                    </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </Fragment>
            )
        }
}

PostReview.propTypes = {
    postReview: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
        UI:state.UI
})

export default connect(
    mapStateToProps,
    { postReview, clearErrors }
  )(withStyles(styles)(PostReview));