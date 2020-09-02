import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false,
    });

    const slideImages =
        [
            require('../../assets/images/bakery1.jpg'),
            require('../../assets/images/bakery2.jpg'),
            require('../../assets/images/bakery3.jpg'),
        ]


    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key='Product'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Product' />
                </ListItem>
                <ListItem button key='Cart'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Cart' />
                </ListItem>
            </List>
            {/* Divider ขีดเส้น */}
            {/* <Divider /> */}

        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Bakery
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
            <Card className={classes.card}>
                <CardContent>
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
                </CardContent>

            </Card>

        </div>
    );
}
