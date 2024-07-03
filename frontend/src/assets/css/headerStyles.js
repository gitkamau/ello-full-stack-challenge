import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#5ACCCC',
    background: 'rgba(90, 204, 204, 0.95)',
    [theme.breakpoints.down('lg')]: {
      paddingY: '20px',
    },
    [theme.breakpoints.down('md')]: {
      paddingY: '15px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingY: '10px',
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      paddingY: '8px',
    },
    [theme.breakpoints.down('xxs')]: {
      paddingY: '5px',
    },
  },
  toolbar: {
    transition: 'all 300ms ease-in-out',
    paddingY: '25px',
    '&.is-scrolling': {
      backgroundColor: '#5ACCCC',
      background: 'rgba(90, 204, 204, 0.95)',
      border: 0,
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  },
  menuIcon: {
    color: '#ffffff',
    padding: 0,
    marginTop: '13px',
    marginBottom: 0,
    fontSize: '26px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: '10px',
    },
  },
  appName: {
    flexGrow: 1,
    cursor: 'pointer',
    fontFamily: 'Raleway, "Open Sans", Helvetica, Arial, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '11px',
    lineHeight: '15px',
    color: '#ffffff',
    transition: 'all 0.5s ease',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  logoutButton: {
    margin: '6px 0 10px 15px',
    padding: '7px',
    backgroundColor: '#FABD33',
    color: '#fff',
    '&:hover, &:focus': {
      backgroundColor: '#FABD33',
      color: '#fff',
      borderColor: '#FABD33',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '6px 0',
    },
  },
}));

export default useStyles;
