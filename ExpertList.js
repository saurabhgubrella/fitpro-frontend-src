import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import './experts.css';
import experts from '../../database/experts';
import avatar from '../../assets/avatar.png';
import Modal from "../modal/Modal";
import {Card} from 'react-bootstrap'
import Pagination from '../pagination/Pagination';
import Navbar from '../../components/NavBar/Navbar';
import { get } from 'lodash';
import CommentsModal from './CommentsModal'
import Avatar from '../../assets/avatar.png'
import Banner from '../../assets/banner.jpg'
import { AiOutlineContacts } from 'react-icons/ai';
import {FaRegCommentAlt,FaPhone,FaStar,FaRegCalendarCheck} from 'react-icons/fa'
import CommentViewModal from './CommentViewModal';
import {MdEmail} from 'react-icons/md'
import Footer from "../../components/FooterComponent"
import FooterComponent from '../../components/FooterComponent';
const banner ={
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%,',
    height: '125px',
    // backgroundImage: `url(${Banner})`,
    backgroundImage:'(../assets/Banner.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
}



function ExpertList({ expert }) {


    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState({ show: false, details: null });

    // const [expertList, setExpertList] = useState([])
    const [expertId, setExpertId] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8)
    const [ListData, setListData] = useState([8]);
    const [expertEmailId, setExpertEmailId] = useState("");

    const [expertListData, setExpertListData] = useState([])


    const toggleModal = (id) => {
        setModalIsOpen(!isModalOpen);
        //setExpertId(expertListData.filter(item =>console.log(item,"111") ))
        setExpertEmailId(id)
        // console.log(expertId)
    };

    // item.Expert_Id === id && item.status === "Available"

    const openCommentsModal = (items) => {
        const loginUserDetails = JSON.parse(localStorage.getItem("user"))
        const loginUserData = _.get(loginUserDetails,'data')
        setIsCommentsModalOpen({ show: true, details: {...items, loginEamil: _.get(loginUserData,'emailId','')} })

    }

    const fetchData = (expert) => {
        fetch(" http://localhost:8080/user-service/api/v1/getAllExpert")
            //  fetch("https://fitpro.stackroute.io/userservice/api/v1/experts")
            .then(res => res.json())
            .then(response => {
                if (expert) {
                    setExpertListData(response.data.filter(eachData => eachData.specialization === expert))
                } else {
                    setExpertListData(response.data)
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData()
    }, []);
    useEffect(() => {
        fetchData(expert)
    }, [expert]);
    // console.log(expertListData,"1234");
    // // const doctor = expertListData ;
    // console.log(experts,"feu");
    useEffect(() => {
        if (expert === 'Aerobics') {
            setListData(expertListData.filter(item => item.specialization === "Aerobics"))
        }
        else if (expert === 'Ayurvedic') {
            setListData(expertListData.filter(item => item.specialization === "Ayurvedic"))
        }
        else if (expert === 'Career Counsellor') {
            setListData(expertListData.filter(item => item.specialization === "Career Counsellor"))
        }
        else if (expert === 'Dermatologist') {
            setListData(expertListData.filter(item => item.specialization === "Dermatologists"))
        }
        else if (expert === 'Fitness Instructor') {
            setListData(expertListData.filter(item => item.specialization === "Fitness Instructor"))
        }
        else if (expert === 'Gynaecologist') {
            setListData(expertListData.filter(item => item.specialization === "Gynaecologist"))
        }
        else if (expert === 'Nutritionist') {
            setListData(expertListData.filter(item => item.specialization === "Nutritionist"))
        }
        else if (expert === 'Physician') {
            setListData(expertListData.filter(item => item.specialization === "Physician"))
        }
        else if (expert === 'Yoga') {
            setListData(expertListData.filter(item => item.specialization === "Yoga"))
        }


        else {
            setListData(expertListData)
        }

    }, [expert])
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = ListData.slice(indexOfFirstPost , indexOfLastPost)
    const paginate = (number) => {
        setCurrentPage(number)
    }


    const CardComponent = ({item}) => {
        return (
            <Card style={{ width: '16rem',padding: "0px", height : "auto",margin: "10px" ,marginBottom:"15px" , borderRadius: "12px"}}>
            <Card.Body style={{padding: "0px",borderRadius: "12px", overflow:'hidden'}}>
              <div style={{position:'relative'}}>

                <div style={{width: "100%", backgroundColor:'#21E1E1', height: "90px"}}></div>
                <img src={"https://media.istockphoto.com/photos/indian-male-doctor-picture-id177373093?k=20&m=177373093&s=612x612&w=0&h=-PQwmaJszuQyxLQYuWL4VL731lr_dnhrttc4AOcB3-k="} alt="user-image" style={{
                    height: "100px",
                    width: "100px",
                    position:'absolute',
                    backgroundColor:"#fff",
                    left: "30%",
                    top: "40px",
                    objectFit:'cover',
                    borderRadius:"800px"
                }}/>
              </div>
             <div  style={{paddingTop: "30px",marginTop: "30px"}}>
              <Card.Title className='text-center' >{item.firstName} {item.lastName}<br/>
              
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-left" style={{margin: "0 auto", width: "70%"}}>
              <div style={{display:"inline-flex",alignItems:'center',overflow:'hidden'}}><MdEmail className='mx-2'/>{item.emailId}</div><br/>
              <div style={{display:"inline-flex",alignItems:'center',overflow:'hidden'}}><FaPhone className='mx-2'/>{item.phoneNumber}</div><br/>
              <div style={{display:"inline-flex",alignItems:'center'}}><FaStar className='mx-2'/>{item.specialization ? item.specialization : "-NA-"}</div><br/>

              </Card.Subtitle>
             <div className="d-flex justify-content-center align-items-center">
                <div>
    
              <Card.Link onClick={() => toggleModal(item.emailId)} style={{textDecoration: "none"}}>
                <FaRegCalendarCheck style={{height:"35px",color:'#000'}}/>
              </Card.Link>
              <Card.Link  onClick={() => openCommentsModal(item)} style={{textDecoration: "none"}}>
                <FaRegCommentAlt style={{height:"20px",color:'#000'}}/>
              </Card.Link>
                </div>
             </div>

             </div>
            </Card.Body>
          </Card>
        )
    }
    
    return (
        <>
        <div className='w-100'>
            <div className='list_of_experts'>
                {isModalOpen && <Modal onRequestClose={toggleModal} id={expertEmailId} />}
                {isCommentsModalOpen.show && <CommentViewModal modalDetails={isCommentsModalOpen} setModalDetails={setIsCommentsModalOpen} />}
                {
                    expertListData?.map((item, index) => {
                        return <CardComponent item={item}/>
                        // return (
                        //     <div className='each_expert' key={index}>
                        //         <img src={avatar} alt="avatar" style={{ "borderRadius": "50%", "verticalAlign": "middle", "width": "50px", "height": "50px" }} />

                        //         <div style={{ height: "120px" }}>
                        //             <h3 className='m-0'>{item.firstName} </h3>

                        //             {/* <h5 className='m-0'>{item.specialization}</h5>
                        //     <h5 className='m-0'>{item.educationalQualification}</h5>
                        //     <h5 className='m-0'>{item.aboutMe}</h5> */}

                        //         </div>
                        //         <div className='row align-items-center'>
                        //             <div className='col-md-5'>
                        //                 <button onClick={() => openCommentsModal(item)}>Comments</button>
                        //             </div>
                        //             <div className='col-md-7'>
                        //                 <span style={{ "height": "70px", "cursor": "pointer", }} onClick={() => toggleModal(item.emailId)}>Book Appointment</span>
                        //             </div>
                        //             {/* <div className='col-md-5'>
                        //      <button style={{"height":"70px",}}>Comments</button>
                        //      </div>   */}
                        //             {/* http://localhost:8080/user-service/api/v1/commet */}
                        //         </div>



                        //     </div>
                        // );
                    })
                }

            </div>
            {/* <Pagination postsPerPage={postsPerPage} totalPost={setListData.length} paginate={paginate}/> */}
        </div>
           
        </>
        
    );
}

export default ExpertList;
