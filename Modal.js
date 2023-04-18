import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import './modal.css';
import close from '../../assets/close.png'
import axios from "axios";
import { BiTime } from 'react-icons/bi';
import { AiFillCalendar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
// import experts from '../../database/experts'

// const email = "Nakul@gmail.com";
// const user_Email = "saurabh@gmail.com"
const Modal = ({ onRequestClose, id }) => {
	const [date, onChange] = useState(new Date());
	const [data, setData] = useState([]);
	const emailId = window.localStorage.getItem("EmailID");
	const [expertProfile, setExpertProfile] = useState({});
	const [product, setProduct] = useState({
		name:"Consultation",
		price:750,
		productBy:"FitPro"
		});
	// const data = experts.doctors.AddScheduler.filter(item => item.Expert_Id === id && item.status === "Available")

	// console.log('date',date)

	const makePayment = token => {
		const body = {
		  token,
		  product
		}
		// const headers={
		//   "Content-Type":"application/json"
		// }
		return axios.post("http://localhost:8282/payment",body)
		.then(res=>console.log(res),
		toast("Booking Successfull",{type: "success"}),
		toast("Email Confirmation sent",{type: "success"})
		)
		.catch(err=>console.log(err))
	  }

	const customStyles = {
		iconsize:{
			height:"25px"
		}
	}

	useEffect(() => {
		function onKeyDown(event) {
			if (event.keyCode === 27) {
				onRequestClose();
			}
		}

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};

	});

	useEffect(() => {
		axios.get(`http://localhost:8080/user-service/api/v1/Expertprofile/${id}`)
		.then((response) => (
		  setExpertProfile(response)
		//   console.log("1234",response)
		))
		.catch((err) => {console.log("Problem")})
	}, [expertProfile])
	


		const getAllSlots = () => {
			console.log("inside get slots");

			fetch(`http://localhost:3001/slot/slot/${id}`)
		.then(res=>res.json())
		.then(jsondata=>setData(jsondata))
		//.then(response=>setData(response))
		.catch(err=>console.log(err));
}

	  useEffect(()=> {
		getAllSlots();
	  }, [])

	const bookAppointment = (item) => {

		// experts.doctors.AddScheduler.find(item => item.schedule_Id === id).status = "Booked";
		// setData(temp)
		// const temp = data.filter(item => item.schedule_Id != id);
	
	const JsonData = {
		
	}
   




    axios.post(`http://localhost:8080/appointment-service/appointment/create`, {
		appointmentId: "",
		userEmailId: emailId,
		expertEmailId: id,
		userName: "",
		expertName: expertProfile.data.data.firstName + " "+ expertProfile.data.data.lastName,
		appointmentSpecialization: "",
		PatientConcern:"",
		startTime:item.startTime,
		endTime:item.endTime,
		appointmentStatus: "BOOKED",
		appointmentDate:item.scheduleDate.substring(6, 10)+"-"+item.scheduleDate.substring(3, 5)+"-"+item.scheduleDate.substring(0, 2),
		bookedOn: new Date()
    }
    ).then(res => {
		
		axios.put(`http://localhost:8080/appointment-service/slot/update/${item._id}`, {
			scheduleId: item.scheduleId,
			expertId: item.expertId,
			scheduleDate: item.scheduleDate,
			startTime: item.startTime,
			endTime: item.endTime,
			status: "BOOKED"
		  }
		  ).then(res => {
			console.log(res);
			getAllSlots();
		  })
		  .catch(err => {});
		})
    .catch(err => {});
		
	};




	return (
		<div className="modal__backdrop">
			<div className="modal__container">
				<h3 className="modal__title"></h3>
				<DatePicker onChange={onChange} value={date} />
					{
						data.map(item => {
							return (
								<div key={item.scheduleId} className="booking_list">
									<h5><BiTime style={customStyles.iconsize}/>{ item.startTime} - {item.endTime}</h5>
									<h5><AiFillCalendar style={customStyles.iconsize}/>{item.scheduleDate}</h5>
									<StripeCheckout 
									stripeKey="pk_test_51JVTm3SAuNZd9whPLZ8Ry6HZauWNKx28hwljXcdaz0OaVtXVFMgoldh0rN0oF4WqB8gDoHbKGrnpUM81o4QDvcIa00SgbvkmOD" 
									token={makePayment}
									name='Buy Appointment'
									amount={product.price * 100}
									>
									<button className='btn-book' onClick={() => bookAppointment(item)}>Book <span> Rs 750/-</span> </button>
									</StripeCheckout>
									
								</div>
							);
						})
					}
				<button type="button" className="btn-close-modal" onClick={onRequestClose}>
					<img src={close} height="10%" width="10px" alt="close" />
				</button>
			</div>
			<ToastContainer/>
		</div>
	);
};

export default Modal;


// <button className='btn-book' onClick={() => bookAppointment(item)}>Book<span>Rs 750/-</span> </button>