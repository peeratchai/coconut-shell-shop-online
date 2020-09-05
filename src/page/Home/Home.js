import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Home.css';
import MenuBar from '../../components/MenuBar/MenuBar'
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

export default function Home() {
    const slideImages =
        [
            require('../../assets/images/bakery1.jpg'),
            require('../../assets/images/bakery2.jpg'),
            require('../../assets/images/bakery3.jpg'),
        ]

    return (
        <MenuBar>
            <div className="slide-container">
                <Slide>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                            {/* <span>Slide 1</span> */}
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                            {/* <span>Slide 2</span> */}
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                            {/* <span>Slide 3</span> */}
                        </div>
                    </div>
                </Slide>
            </div>
        </MenuBar>
    );
}
