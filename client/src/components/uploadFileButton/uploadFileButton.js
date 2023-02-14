import axios from "axios";
import React, {useState} from 'react'

const UploadFileButton = (eventID, organizerEmail) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const onFileChange = event =>{
        setSelectedFile(event.target.file[0])
    }
    //the selectedFile should be the file content, should console.log to test and put in the true file content
    const onFileUpload = async () => {
        const headers = {
            'x-api-key': 'DUBwlix96T5zt3M7tOnJ7ilJt6ufVG1436lyXzXh',
            'Content-Type': 'image/jpeg'
        }
        const baseURL = 'https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production/'
        if (eventID){
            await axios.put(`${baseURL}event/image?event_id=${eventID}`, selectedFile, headers)
                    .then(res => {
                        if (res.status === 200){
                            setSuccess(true)
                        }
                    }).catch(err => {
                        setError(err)
                        setSuccess(false)
                    })   

        } else {
            await axios.put(`${baseURL}organizer/image?email=${organizerEmail}`, selectedFile, headers)
            .then(res => {
                if (res.status === 200){
                    setSuccess(true)
                }
            }).catch(err => {
                setError(err)
                setSuccess(false)
            } )  
        }


        
    }

    // can display some stuff like filename and type: selectedFile.name, selectedFile.type
    return(
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload
            </button>
        </div>
    )
}


export default UploadFileButton;