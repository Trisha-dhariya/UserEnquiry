import React, { useState } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableHeadCell,
    TableBody,
    TableCell,
    Button
} from "flowbite-react";
import axios from 'axios';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';

export default function EnquiryList({ data, getAllenquiry,setFormData }) {
    let deleteRow = (delid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
                    .then((res) => {
                        toast.success('Enquiry deleted successfully');
                       
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                getAllenquiry();
            }
         
        });

    };
    let update = (editid) => {
        axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
            .then((res) => {
                let data=res.data;
                setFormData(data.enquiry);
                
            })
    }
    return (
        <div className=' bg-gray-400 mx-3 p-4 overflow-x-auto  '>

            <h1 className="font-bold text-3xl py-4 text-center">Enquiry List</h1>



            <Table className="min-w-full" >
                <TableHead >
                    <TableRow>
                        <TableHeadCell>Sr No</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>Message</TableHeadCell>
                        <TableHeadCell>Delete</TableHeadCell>
                        <TableHeadCell>Edit</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="text-cyan-50">

                    {
                        data && data.length > 0 ? (
                            data.map((item, index) => (

                                <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium text-gray-900 dark:text-white">
                                        {item.Name}
                                    </TableCell>
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.Phone}</TableCell>
                                    <TableCell>{item.Message}</TableCell>
                                    <TableCell><Button onClick={() => deleteRow(item._id)} className='bg-red-500'>Delete</Button></TableCell>
                                    <TableCell><Button onClick={() => update(item._id)} className='bg-green-600'>Edit</Button></TableCell>
                                </TableRow>
                            ))
                        )
                            : (
                                <TableRow>
                                    <TableCell colSpan="7" className="text-center">
                                        No enquiries yet.
                                    </TableCell>
                                </TableRow>)}




                </TableBody>
            </Table>

        </div>
    );
}
