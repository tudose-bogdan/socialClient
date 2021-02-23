import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Profile from '../components/profile/Profile'
import {connect} from 'react-redux'
import {getReviews} from '../redux/actions/dataActions'
import {Line} from 'react-chartjs-2';

class statistics extends Component {
  

    componentDidMount(){
        this.props.getReviews();

    }

    
    
    render() {

        const {reviews} = this.props.data;
        
        var dates = []
        var noOfPosts = {}
        var noOfPostsArray = []
        reviews.forEach((elem) => dates.push(elem.createdAt.split('T')[0]));

        dates.forEach(elem => {
            noOfPosts[elem] = noOfPosts[elem] === undefined ? 1 : noOfPosts[elem] + 1
        })

        for(let key in noOfPosts){
            noOfPostsArray.push(noOfPosts[key])
        }

        var uniqueDates = [...new Set(dates)];
        const data = {
            labels: uniqueDates,
            datasets : [
                {
                    borderColor: ['rgba(255,206,85,0.2)'],
                    backgroundColor: ['rgba(255,206,86,0.2'],
                    pointBackgroundColor: 'rgba(255,206,86,0.2)',
                    label: 'Posts today',
                    data:  noOfPostsArray
                }

            ]
        }

        const options = {
            title:{
                display:true,
                text:'Evolutia numarului de postari'
            },
            scales:{
                yAxes:[
                    {
                        ticks: {
                            min: 0,
                            stepSize: 1
                        }
                    }
                ]
            }
        }

        return (

            <Line data={data} options={options}/>
        )
    
    }
}

statistics.propTypes = {
    getReviews: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired

}


const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps,{getReviews})(statistics);
