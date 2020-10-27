import React from 'react';
// Material UI stuffs
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import auth from '../Services/apiService';



const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
      },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    icon: {
        margin: theme.spacing(1),
        alignItems: 'center',
        backgroundColor: '#4EA69E',
    },

}));

export default function Album() {
  const classes = useStyles();

  const handleLogout = (event) => {
    auth.logout();
    window.location = "/";
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.navbar}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Peppo
            </Typography>
            <Button color="inherit" onClick={handleLogout} >Logout</Button>
            </Toolbar>
        </AppBar>
      </div>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              You've successully login
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                The harder you work for something, the greater you'll feel when you achieve it.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Avatar className={classes.icon}>
                        <SearchIcon/>
                    </Avatar>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <Avatar className={classes.icon}>
                        <ExploreIcon/>
                    </Avatar>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
       
      </main>
    
    </React.Fragment>
  );
}