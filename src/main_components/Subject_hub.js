import React, { useState } from 'react'
//grid
import { Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
//card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';

//modal
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

//css style
import style from '../style.module.css'

//reducer
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEditSubjectData, setIsEditClicked, setIsMainPartReload } from '../reducers/editSubjectStore';

//
import EditSubject from '../forms/editSubjectForm/EditSubject';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

//modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  // height:"80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Subject_hub({ SUBJECT }) {
  const { isEditClicked } = useSelector((state)=> state.editSubjectData);
  const dispatch = useDispatch();  
  console.log(isEditClicked)
  console.log(SUBJECT)

  //button function
  const [loadingBtn, setLoadingBtn] = useState("outlined")

  //image is clicked or not
  const [isImageClicked, setIsImageClicked] = useState(false)

  //delete clicked or not
  const [isDeleteClicked, setIsDeleteClicked] = useState(false)

  //delete id
  const [deleteId, setDeleteId] = useState('')
  
  //key for operation
  const [opKEY, setOpKEY] = useState('');
  const [opkeyError, setOpkeyError] = useState(false)
  
  //modal func
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsImageClicked(false);
    setIsDeleteClicked(false);
    dispatch(setIsEditClicked(false))
  };

  const handelImage = (image) => {
    handleOpen();
    setIsImageClicked(true);
    console.log(image);
    setModalImage(image);
  }

  const handelDeletePost = (_id) => {
    setDeleteId(_id)
    handleOpen();
    setIsDeleteClicked(true)
  }

  const deletePost = async () => {
    setLoadingBtn("disable")
    setOpkeyError(false)

    if(opKEY === ""){
      setOpkeyError(true)
    setLoadingBtn("outlined")

    }
    //
    console.log(deleteId,opKEY)
    if(deleteId && opKEY){
      fetch('http://localhost:8000/post/delete', {
        method: 'DELETE',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id : deleteId, operationKey: opKEY })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setLoadingBtn("outlined");
          handleClose();
          // navigate('/'); 
          dispatch(setIsMainPartReload(true));
      })
      .catch((err) => {
            setLoadingBtn("outlined")
            console.log(err)
            handleClose();
             
      })
    }
  }

  const renderSub = SUBJECT.map(items => {
      const _id = items._id;
      const exam_details = items.exam;
      const item_card_image = items.paperImage;
      const sub_details = items.AboutPaper;
      const sub_year = items.year;

    return (
      <Grid key={_id} item xs={8} md={2.8}>
        <Item className={style.item_card}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              src={item_card_image}
              component="img"
              height="140"
              className={style.item_card_image}
              onClick={()=>handelImage(item_card_image)}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {exam_details}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {sub_details}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sub_year}
              </Typography>
            </CardContent>

            <CardActions>
              <Button 
              size="small" 
              color="success"
              variant="outlined"
              onClick={()=>{
                dispatch(setIsEditClicked(!isEditClicked));
                dispatch(setEditSubjectData(items));
                handleOpen();
              }}>
                {isEditClicked?"close":"Edit"}
                </Button>
              <Button 
              size="small" 
              variant={loadingBtn}
              color="error" 
              // startIcon={<DeleteIcon />}
              onClick={()=> handelDeletePost(_id)}>
                Delete
              </Button>
            </CardActions>

          </Card>
        </Item>
      </Grid>
    )

  })


  return (
    <div className={style.main_section}>
      {/* {isEditClicked? <EditSubject /> : null} */}
      
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="space-around" alignItems="center">

          {renderSub}

        </Grid>
      </Box>

      <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Button onClick={handleClose} style={{margin:'0 0 20px 0'}}>close</Button>
            {isImageClicked?(
              <>
                  <a href={modalImage} download className={style.dnldBtn}>download</a>          
                  <CardMedia
                    src={modalImage}
                    component="img"    
                  />
              </>
            ):null}
            {isDeleteClicked?(
                <>
                  <div className={style.keySection}>
                    <TextField
                      defaultValue={''}
                      onChange={(e) => setOpKEY(e.target.value)}
                      className={style.inputSectionsEdit}
                      margin='normal'
                      gutterBottom
                      label="key"
                      variant="outlined"
                      color='secondary'
                      fullWidth
                      required
                      error={opkeyError}
                    />                
                  </div>
                  <Button 
                  size="small" 
                  variant={loadingBtn}
                  color="error" 
                  // startIcon={<DeleteIcon />}
                  onClick={()=> deletePost()}>
                    Delete
                  </Button>
                </>
            ):null}
            {isEditClicked? <EditSubject /> : null}
          </Box>
        </Fade>
      </Modal>
    </div>
      
    </div>
  )
}

export default Subject_hub













// {/* <Grid item xs={8} md={2.8}>
//             <Item className={style.item_card}>
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   className={style.item_card_image}                  
//                 />
                
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     ca - 1
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     chapter 1 to 3
//                   </Typography>
//                 </CardContent>

//                 <CardActions>
//                   <Button size="small">Edit</Button>
//                   <Button size="small">Delete</Button>
//                 </CardActions>

//               </Card>
//             </Item>
//           </Grid> */}





