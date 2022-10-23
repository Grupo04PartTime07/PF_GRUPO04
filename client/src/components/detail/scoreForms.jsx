import React from "react";
import { useDispatch } from "react-redux";

import { createScore } from "../../redux/actions/create_score";
import { getProductDetails } from "../../redux/actions/get_product_details";

export default function ScoreForm ({id, formDisplay}){
    const dispatch = useDispatch();
    const [input, setInput] = React.useState({
        score: 0,
        coment: ""
    })
    const [error, setError] = React.useState('')

    function validateInput(input){
        let errors={};
        if(!input.coment){
            errors.coment="Debe incluir una breve reseña del producto"
        }
        return errors;
    }

    function handleChange(e){
        setInput({...input, [e.target.name]: e.target.value});
        setError(validateInput({...input, [e.target.name]: e.target.value}));
    }

    function deleteForm(){
        setInput({
            score: "",
            coment: ""
        })
    }

    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(createScore( {id:id, score:input.score, coment: input.coment} ));
        deleteForm();
        setError({})
        formDisplay();
        getProductDetails(id)
    }

    function ensabledSubmit(){
        return !input.coment;
    }

    return(
        <div>
            <h1>¿Como te parece este Producto?</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <p>Valoración:</p>
                    <input name="score" type="range" min="0" max="5" value={input.score} onChange={(e)=>handleChange(e)}/>
                    <label>{input.score}</label>

                    <p>Comentario:</p>
                    <textarea name="coment" type="text" maxlength="150" value={input.coment} onChange={(e)=>handleChange(e)}/>
                    {error.coment && (<p >{error.coment}</p>)}
                </div>
                <input type="submit" value="Guardar" disabled={ensabledSubmit()}/>
            </form>
        </div>
    )
}