import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#1976d2",
    },
    "& .MuiRating-iconHover": {
      color: "#154bbf",
    },
  });

export default function OpinionCard({detail}) {
  return (

        <div className="opinionContainer">
            {detail.opiniones &&
              detail.opiniones.map((e) =>     
              <Card sx={{ minWidth: 275, height: 175, margin: '10px' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <div className="opinionStars">
                    <StyledRating 
                      defaultValue={e.score}
                      precision={0.5}
                      readOnly
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                      sx={{ margin: "15px" , textAlign:"center"}}
                    />
                    {/* <p className="detailDescription opinionDescription"> */}
                    <Typography className='opinionComment' sx={{ fontSize: 14, marginLeft: '20px' }} color="text.secondary" gutterBottom>
                        {e.coment}
                    </Typography>
                    {/* </p> */}
                  </div>
                 </Typography>
      </CardContent>
    </Card>)}
    </div> 
  );
}