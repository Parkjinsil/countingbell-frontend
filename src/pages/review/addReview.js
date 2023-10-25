import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddReview } from "../../store/reviewSlice"; 
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddReview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reviewContent", e.target.reviewContent.value);
        formData.append("reviewGrade", e.target.reviewGrade.value);
        formData.append("id", e.target.id.value);
        formData.append("resCode", e.target.resCode.value);

        dispatch(asyncAddReview(formData))
        navigate("/restaurant");
    };
};