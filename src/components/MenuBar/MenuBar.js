import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-slideshow-image/dist/styles.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Badge } from 'antd';
import Divider from '@material-ui/core/Divider';
import './MenuBar.css'
import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        margin: '5%',
        minHeight: window.innerHeight - 169 - ((window.innerHeight * 5 / 100) * 4)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
    footer: {
        // position: 'fixed',
        // left: 0,
        // bottom: 0,
        width: '100%',
        backgroundColor: '#3F51B5',
        color: 'white',
        height: '100px'
    }
}));

function MenuBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [numOfCart, setNumOfCart] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false,
    });

    useEffect(() => {
    });

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
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                <div style={{ padding: '10px', backgroundColor: '#3F51B5' }}>
                    <h1 style={{ color: 'white' }}>
                        Bakery Home
                    </h1>
                </div>
            </Link>
            {/* Divider ขีดเส้น */}
            <Divider />
            <List>
                <Link to="/home" style={{ color: "black", textDecoration: "none" }}>
                    <ListItem button key='Home'>
                        <ListItemIcon>
                            <Icon type="home" />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </Link>
                <Link to="/products" style={{ color: "black", textDecoration: "none" }}>
                    <ListItem button key='Products'>
                        <ListItemIcon>
                            <Icon type="shop" />
                        </ListItemIcon>
                        <ListItemText primary='Products' />
                    </ListItem>
                </Link>
                <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
                    <ListItem button key='Cart'>
                        <ListItemIcon>
                            <Icon type="shopping-cart" />
                        </ListItemIcon>
                        <Badge id="menubar" count={props.cart.Num_of_Products}>
                            <ListItemText primary='Cart' style={{ marginRight: '10px' }} />
                        </Badge>
                    </ListItem>
                </Link>
            </List>


        </div>
    );
    console.log(props.cart)
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                            {props.title}
                        </Link>
                    </Typography>
                    {auth && (
                        <div>
                            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Badge count={props.cart.Num_of_Products}>
                                        <Icon type="shopping-cart" className="head-example" />
                                    </Badge>
                                </IconButton>
                            </Link>
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
                                <MenuItem onClick={handleClose}>
                                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Log out</Link>
                                </MenuItem>
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
                    {props.children}
                </CardContent>
            </Card>
            <div className={classes.footer}>
                <Row >
                    <Col span={12}>
                        <div style={{ padding: '25px' }}>
                            Address : 1518 Pracharat 1 Road,Wongsawang, Bangsue, Bangkok 10800 Thailand. <br />
                            Contact Tel : 0-2555-2000.
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ padding: '25px' }}>
                            Fax: 0-2587-4350.<br />
                            Email : contact@op.kmutnb.ac.th
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})


export default connect(mapStateToProps)(MenuBar)