import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { createScore } from "../../redux/actions/create_score";
import { getProductDetails } from "../../redux/actions/get_product_details";
import Rating from "@mui/material/Rating";
//import Stack from "@mui/material/Stack";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { styled } from '@mui/material/styles';
import "./scoreForms.css";

export default function ScoreForm({ id, formDisplay }) {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    score: 0,
    coment: "",
  });
  const [error, setError] = React.useState("");

  function validateInput(input) {
    let errors = {};
    if (!input.coment) {
      errors.coment = "Debe incluir una breve reseña del producto";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateInput({ ...input, [e.target.name]: e.target.value }));
  }

  function deleteForm() {
    setInput({
      score: "",
      coment: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(createScore({ id: id, score: input.score, coment: input.coment }));
    deleteForm();
    setError({});
    formDisplay();
    getProductDetails(id);
  }

  function ensabledSubmit() {
    return !input.coment;
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#1976d2',
    },
    '& .MuiRating-iconHover': {
      color: '#154bbf',
    },
  });

  return (
    <div>
      <h1>¿Que te parecio este producto?</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="commentContainer">
          {/* <p>Valoración:</p> */}
          {/* <input name="score" type="range"  min="0" max="5" value={input.score} onChange={(e)=>handleChange(e)}/>
                    <label>{input.score}</label> */}
          {/* <Stack spacing={1} >
                        <Rating name="score" defaultValue={1} precision={0.5} className="commentStars" value={input.score} onChange={(e)=>handleChange(e)}/>
                    </Stack> */}
          <StyledRating
            name="score"
            className="commentStars"
            value={input.score}
            onChange={(e)=>handleChange(e)}
            defaultValue={1}
            // getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<StarRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
          />
          <h3 className="CommentTitle">Agrega un comentario</h3>
          <textarea
            name="coment"
            type="text"
            maxlength="150"
            className="commentTextarea"
            value={input.coment}
            onChange={(e) => handleChange(e)}
          />
          <p className="commentLength">{input.coment.length}/150</p>
          {error.coment && <p className="commentError">{error.coment}</p>}
        </div>
        {/* <input type="submit" value="Guardar" className="commentButton" disabled={ensabledSubmit()}/> */}
        <Button
          type="submit"
          value="Guardar"
          disabled={ensabledSubmit()}
          variant="contained"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
}
