import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import login from './pages/Login';
import Home from './pages/Home.jsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3ECCBB',
      main: '#279185',
      dark: '#1A6158',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffb5a7',
      main: '#e07a5f',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
}
)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path="/" component={login}/>
            <ProtectedRoute path="/home" render={() => <Home/>} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
    
  );
}

export default App;
