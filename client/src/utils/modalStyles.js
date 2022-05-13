import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  createBoardModal: {
    width: 400,
  },
  cardModal: {
    width: 900,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 400,
    },
  },
  chartModal: {
    width: 1500,
    height: '80vh',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 400,
    },
  },
  cardTitle: {
    width: '100%',
  },
  button: {
    width: 180,
    marginTop: 10,
  },
  membersTitle: {
    margin: '20px 0 10px',
  },
  labelTitle: {
    margin: '20px 0 10px',
  },
  attachmentTitle: {
    margin: '20px 0 10px',
    color:'orange'
  },
  userText :{
color: 'blue'
  },
  colorPicker: {
    minWidth: 212,
  },
  noLabel: {
    width: 100,
    marginBottom: '30px !important'
  },
  moveCardTitle: {
    marginTop: 20,
  },
  moveCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  moveCardSelect: {
    marginTop: 10,
    marginRight: 20,
    width: 200,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },

  datePicker: {
    background:'green',
    display: 'flex',
    justifyContent: 'space-around',
    width:'20%',
    margin: '2px 0 5px',
  },

  fileThumb: {
    width:'100px !important',
    height:'100px',
    display:'flex',
    margin:'20px 0 10px',
    overflow:'hidden',
    '&:hover':{
      cursor: 'pointer'
    }
  },

  thumbImg:{
    backgroundSize:'cover'
  },

  modalImg : {
    maxWidth: '100%',
    maxHeight: 'auto'
  },

  checklistItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  checklistFormLabel: {
    width: '100%',
    fontWeight: '5px'
  },
  itemButtons: {
    display: 'flex',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  itemButton: {
    height: 40,
  },
  checklistBottom: {
    marginTop: 5,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('md')]: {
      top: '5%',
      maxHeight: '90vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTop: {
    display: 'flex',
  },
  modalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: 'auto',
  },
  modalBottomRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  archiveButton: {
    marginBottom: 5,
  },


  weekWrap:{
    width: "fit-content",
    height: 40,
    borderRadius: '30px',
    backgroundColor: "#E9DAC1",
    paddingTop: 10,
    paddingLeft : 20,
  },
  taskBar:{
    width: 2,
    color:"#7882A4"
  }
}));

export default useStyles;
