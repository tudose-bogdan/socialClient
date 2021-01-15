import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

//MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import {connect} from 'react-redux'
import {deleteReview} from '../redux/actions/dataActions'

const styles = {
 deleteButton: {
     position: 'absolute',
     left: '90%',
     top:'10%'
 }
}


class DeleteReview extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({open:false});
    }

    deleteReview = () => {
        this.props.deleteReview(this.props.criticId);
        this.setState({open:false});

    }


    render() {
        const {classes} = this.props;
        return (
        <Fragment>
            <MyButton tip="Delete this post" onClick={this.handleOpen} btnClassname={classes.deleteButton}>

              <DeleteOutline color="secondary"/>  
            </MyButton>

            <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >

            <DialogTitle>
                Are you sure?
            </DialogTitle>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>

                <Button onClick={this.deleteReview} color="secondary">
                    Delete
                </Button>
                
            </DialogActions>   
            </Dialog>
        </Fragment>
        )
    }
}

DeleteReview.propTypes = {
    deleteReview: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    criticId: PropTypes.string.isRequired
}




export default connect(null, { deleteReview})(withStyles(styles)(DeleteReview));
