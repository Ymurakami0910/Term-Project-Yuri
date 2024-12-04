import React from "react";
import { useNavigate } from "react-router-dom";

function Gallery (){
    const navigate = useNavigate(); 
    return (
        <>  
        <section>
        <div>
        <h1>Hello</h1>
        <button label="next" onClick={() => navigate("/western")} />
        <button label="next" onClick={() => navigate("/japanese")} />
        </div>
        </section>
        </>
    )
}

export default Gallery