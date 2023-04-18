import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import DatePicker from 'react-date-picker';
import close from '../../assets/close.png'
import axios from "axios";
import { BiTime } from 'react-icons/bi';
import { AiFillCalendar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
// import experts from '../../database/experts'

const CommentViewModal = ({ modalDetails, setModalDetails }) => {

    const details = _.get(modalDetails,'details')
    console.log(details)
   const onRequestClose = () => {
	setModalDetails({...modalDetails,show: false})
   }

//    const getComments = async() => {
//     try{
//         const response = await axios.post("http://localhost:8080/user-service/api/v1/commet")
//         console.log(response.data)

//     }catch(err ){
//         console.log(err)
//     }
//    }
//    useEffect(() => {
//     getComments()
//    },[modalDetails])

	return (
		<div className="modal__backdrop">
			<div className="modal__container" style={{height: "auto"}}>
				<h3 className="modal__title">Comments</h3>

                <div>
                    {
                      details.comment.map(each => (
                        <div className="mb-2">
                            <p className="m-0"> {each.commentorcomment}</p>
                            <span>{each.commentordate}</span>
                            <hr/>
                            <p style={{fontWeight:'bold', textAlign:'right'}}>....{each.commentorname}</p>
                        </div>
                      ))
                    }

                </div>

 
<button type="button" className="btn-close-modal" onClick={onRequestClose}>
					<img src={close} height="10%" width="10px" alt="close" />
				</button>

				 <div className='d-flex justify-content-end'>

			<button type="button" class="btn btn-primary m-1">Add Comment</button>
			<button type="button" class="btn btn-primary m-1">cancel</button>
			</div>  
</div>
				
			
		
			<ToastContainer/>
		</div>
	);
};

export default CommentViewModal;