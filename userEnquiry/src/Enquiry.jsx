import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput, Textarea, } from 'flowbite-react';
import EnquiryList from './enquiry/EnquiryList';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
export default function Enquiry() {
    let [enquiryList, setEnquiryList] = useState([]);
    let [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Message: '',
        _id: ''
    });
    console.log("formData");
    const saveEnquiry = async (e) => {
        e.preventDefault();

        if (formData._id) {
            axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
                .then((res) => {
                    
                    toast.success('Enquiry updated successfully');
                    setFormData({
                        Name: '',
                        Email: '',
                        Phone: '',
                        Message: '',
                        _id:''
                    });
                    getAllenquiry();
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response?.data?.code === 11000) {
                        toast.error("Email already exists. Please use another email.");
                    } else {
                        toast.error("Something went wrong while saving enquiry.");
                    }
                })
            
        }
        else {
            axios.post('http://localhost:8020/api/website/enquiry/insert', formData)
                .then((res) => {
                    console.log(res.data);
                    toast.success('Enquiry saved successfully');
                    setFormData({
                        Name: '',
                        Email: '',
                        Phone: '',
                        Message: ''
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response?.data?.code === 11000) {
                        toast.error("Email already exists. Please use another email.");
                    } else {
                        toast.error("Something went wrong while saving enquiry.");
                    }
                })
            getAllenquiry();
        }
    }
    let getAllenquiry = () => {
        axios.get('http://localhost:8020/api/website/enquiry/view')
            .then((res) => {

                console.log("Raw response:", res.data)
                return res.data
            })
            .then((finalData) => {
                if (finalData.status) {
                    setEnquiryList(finalData.enquiry)
                }

            })

    }
    let getValue = (e) => {
        let inputData = e.target.name
        let inputValue = e.target.value
        let oldData = { ...formData }
        oldData[inputData] = inputValue;
        setFormData(oldData)
    }
    useEffect(() => {
        getAllenquiry()
    }, []);


    return (
        <div >
            <ToastContainer />
            <h1 className="font-bold text-4xl py-6 text-center gap-40px">User Enquiry</h1>

            <div className='grid grid-cols-[30%_70%]'>
                <div className='bg-gray-500 mx-2 p-4'>
                    <h2 className='text-[20px] text-center font-bold' >Enquiry Form</h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className='py-3'>
                            <Label htmlFor="Name" className="mb-1 block text-gray-700" >
                                Your Name </Label>
                            <TextInput onChange={getValue} value={formData.Name} name="Name" className="mt-1" type="text" placeholder="Enter Your Name" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="Email" >
                                Your Email</Label>
                            <TextInput className="mt-1" onChange={getValue} value={formData.Email} name="Email" type="email" placeholder="Enter Your Email" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="Phone" >Your Phone</Label>
                            <TextInput className="mt-1" onChange={getValue} value={formData.Phone} name='Phone' type="tel" placeholder="Enter Your Phone" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="Message" className="text-black-700 font-medium" >
                                Message</Label>
                            <Textarea className="mt-1" onChange={getValue} name='Message' value={formData.Message} placeholder="leave a comment..." required rows={4} />
                        </div>
                        <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ' type="submit">{formData._id ? 'update' : 'save'}</Button>
                    </form >
                </div>
                <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} setFormData={setFormData} />

            </div>
        </div>
    );
}

