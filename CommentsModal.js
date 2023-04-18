import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import close from '../../assets/close.png'
import axios from "axios";
import { BiTime } from 'react-icons/bi';
import { AiFillCalendar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
// import experts from '../../database/experts'

const CommentsModal = ({ modalDetails, setModalDetails }) => {

	const [comment, setComment] = useState("")

   const onRequestClose = () => {
	setModalDetails({...modalDetails,show: false})
   }

   const handleAdd = (e) =>{
   setComment(e.target.value)
   }

	return (
		<div className="modal__backdrop">
			<div className="modal__container" style={{height: "auto"}}>
				<h3 className="modal__title">Comments</h3>
                <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Commentor EmailId</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Comment Name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" />
</div>

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Comment Date</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" />
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Comments</label>
  <textarea class="form-control"  id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<button type="button" className="btn-close-modal" onClick={onRequestClose}>
					<img src={close} height="10%" width="10px" alt="close" />
				</button>

				 <div className='d-flex justify-content-end'>

			<button type="button" class="btn btn-primary m-1"onClick={handleAdd}>Add Comments</button>
			<button type="button" class="btn btn-primary m-1">cancel</button>
			</div>  
</div>
				
			
		
			<ToastContainer/>
		</div>
	);
};

export default CommentsModal;