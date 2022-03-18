import React from 'react'
//grid
import { Grid } from '@mui/material'
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

//css style
import style from '../style.module.css'




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Subject_hub({ SUBJECT }) {
  console.log(SUBJECT)


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
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>

          </Card>
        </Item>
      </Grid>
    )

  })


  return (
    <div className={style.main_section}>
      
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="space-around" alignItems="center">

          {renderSub}

        </Grid>
      </Box>
      
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





