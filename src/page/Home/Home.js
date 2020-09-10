import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Home.css';
import MenuBar from '../../components/MenuBar/MenuBar'
import { connect } from 'react-redux'
import return_image from '../../services/image'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        margin: '5%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));

function Home(props) {

    return (
        <MenuBar title="Coconut Shell">
            <div className="slide-container">
                <Slide>
                    {
                        props.cart.Cart.map((product) => {
                            return (
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${return_image(product.name)})`, height: '60vh' }}>
                                        <span style={{ paddingTop: '80%', background: 'transparent' }}>
                                            <div style={{backgroundColor:'#CECECE'}}>
                                                {product.name}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slide>
            </div>
        </MenuBar>
    );
}


const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Home)