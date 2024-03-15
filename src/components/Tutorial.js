import React,{useState,useEffect} from "react";
import{useParams,useNavigate} from "react-router-dom";
import TutorialDataService from "../services/TutorialService";


const Tutorial = props =>{
    const{id}= useParams();// this is how we can load a parameter in the functional component(Tutorial)
    let navigate=useNavigate(); //useNavigate hook will be used to navigate the user from Tutorial to List Tutorial Page

    const initialTutorialState={ // object with default data- we will use for display
        id:null,
        title:"",
        description:"",
        published:false

    };

    const [currentTutorial,setCurrentTutorial]= useState(initialTutorialState);
    const[message,setMessage]= useState("");

    const getTutorial = id => { // using this arrow function - we are going to pull the data from DB
        // the page that we get after we click on edit
        //so we already have the existing information and we make changes to it
        // id is html id 
        TutorialDataService.get(id)
        .then((response)=> {
            console.log("Tutorial for ID: " + id + " is "+ JSON.stringify(response.data));
            setCurrentTutorial(response.data);// we set in the state variable  - currentTutorial
        }).catch((error)=> {
            console.log(error);
        });

    };

    useEffect(()=> {
        if(id){
            getTutorial(id);
        }
    }, [id]);


    const handleInputChange = event => {
        const {name, value} = event.target; // array destructuring
        setCurrentTutorial({...currentTutorial,[name]:value}); // refer AddTutorial for comments
    };

    const updatePublished = status => {
        var data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        };
        console.log(currentTutorial.id, currentTutorial.title, currentTutorial.description, status);

        TutorialDataService.update(currentTutorial.id,data)
        .then(response => {
            console.log(response.data);
            setMessage("The Tutorial is updated successfully");
            navigate("/tutorials")
        })
        .catch((error)=> {
            console.log(error);
        });
    };
    console.log(currentTutorial.id, currentTutorial.title, currentTutorial.description);

    const deleteTutorial = () => {
        TutorialDataService.remove(currentTutorial.id)
        .then((response) => {
            console.log(response.data);
            navigate("/tutorials")
        }).catch((error) =>{
            console.log(error);
        })
    };
    console.log(currentTutorial.id, currentTutorial.title, currentTutorial.description);

    const updateTutorial =() =>{
        TutorialDataService.update(currentTutorial.id,currentTutorial)
        .then((response)=> {
            console.log(response.data);
            setMessage("The Tutorial has been updated successfully");
            navigate("/tutorials")
        }).catch((error)=> {
            console.log(error);
        })
    };
    console.log(currentTutorial.id, currentTutorial.title, currentTutorial.description);

     return(
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial:</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type ="text" className="form-control"
                            id="title" name="title"
                            value={currentTutorial.title}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input type ="text" className="form-control"
                            id="description" name="description"
                            value={currentTutorial.description}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published": "Pending"}
                        </div>
                        
                    </form>

                    {currentTutorial.published ? (
                        <button className="btn btn-outline-secondary" onClick={()=>updatePublished(false)}>
                            Unpublish
                        </button>
                    ): (
                        <button className="btn btn-outline-secondary" onClick={()=>updatePublished(true)}>
                            Publish
                        </button>
                    )}
                    <button className="btn btn-outline-secondary" onClick={deleteTutorial}>
                            Delete
                        </button>

                        <button type="submit"
                        className="btn btn-outline-secondary"
                        onClick={updateTutorial}
                        >Update</button>
                        <p>{message}</p>
                        </div>
            ): (
                <div>
                    <br/>
                    <p>Please click on a Tutorial to start with...</p>
                    </div>
            )}
        </div>
     );
           
    
    }





export default Tutorial