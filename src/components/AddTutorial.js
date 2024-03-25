import React,{useState} from "react";
import TutorialDataService from "../services/TutorialService"
import {useNavigate} from "react-router-dom"

const AddTutorial =() => {
    const initialTutorialState={
        id:null,
        title:"",
        description:"",
        published:false
    };
    const[tutorial,setTutorial]= useState(initialTutorialState);
    const[submitted, setSubmitted]= useState(false);
    let navigate=useNavigate();
    const handleInputChange =event =>{
        /* we're using spread operator as this tutorial object has 4 fields
        id,title, description and published and here we're using this to set 
        new data when user clicks on add , we handle the input changes to
        Title(name) and the tile is set by user(value), same is done for description */
        const{name,value} =event.target
        setTutorial({...tutorial,[name]:value});
    };

    const saveTutorial =()=>{
        var data= {
            title:tutorial.title,
            description: tutorial.description,
            published: tutorial.published
        };

        TutorialDataService.create(data)
        .then((response)=> {
            setTutorial({
                id:response.data.id,
                title:response.data.title,
                description: response.data.description,
                published:response.data.published
            });
            setSubmitted(true);
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
            alert(error);
        });
    };

    const newTutorial =() =>{
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    const tutorialPage =() =>{
        navigate("/tutorials")
    }

    return(
        <div className="submit-form">
            {submitted? (
                <div>
                    <h4>You Submitted Successfully</h4>
                    {/* me-3 is to add spaces between buttons- Bootstrap-5 feature
                     */}
                    <button className="btn btn-success me-3" onClick={newTutorial}>
                        Add
                    </button>

                    <button className="btn btn-success" onClick={tutorialPage}>
                        Tutorials
                    </button>
                    </div>
            ):(
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control"
                         id="title" required value={tutorial.title}
                         /*Here name of the attribute is title and value is 
                         set via tutorial.title. The moment you start typing something
                         in the textbox, onChange event will be fired which will 
                         call the function handleInputChange which will set the title:value
                         in tutorial object and same is done for description textbox below */
                        onChange={handleInputChange}
                        name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" className="form-control"
                        id="description" required value={tutorial.description}
                        onChange={handleInputChange}
                        name="description"
                        />
                       
                    </div>

                    <div className="form-group">
                        <label htmlFor="published">Published:</label>
                        <input type="text" className="form-control"
                        id="published" required value={tutorial.published}
                        onChange={handleInputChange}
                        name="published"
                        />
                        <br/>
                    </div>
                    
                    <button onClick={saveTutorial} className="btn btn-success">
                    
                        Submit
                    </button>
                    </div>
            )}
        </div>
    );

};
 export default AddTutorial