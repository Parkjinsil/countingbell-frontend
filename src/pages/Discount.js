import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { asyncAddDiscount } from "../store/discountSlice";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 50px 20px 20px 20px;
`;

const Discount = () => {

    const dispatch = useDispatch();

    const onAddDiscount = (e) => {
        
        e.preventDefault(); 

        const formData = new FormData(); 
        formData.append("disDesc", e.target.disDesc.value);
        formData.append("disPeriod", e.target.disPeriod.value);
        formData.append("resCode", e.target.resCode.value);

        console.log(formData);
    
        dispatch(asyncAddDiscount(formData));
      };

      return (
        <div className="container my-5">
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5" style={{marginTop:'100px'}}>
        <Container>
          <H1>할인</H1>
          <Form onSubmit={onAddDiscount} style={{ width: "600px", margin: "0 auto" }}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="할인설명" name="disDesc" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="할인기간" name="disPeriod" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="식당코드" name="resCode" />
            </Form.Group>
            <Form.Group className="mb-3">
              <button type="submit" className="btn btn-primary">할인등록</button>
            </Form.Group>
            
          </Form>
        </Container>
        </div>
        </div>
      );
    };
    
    export default Discount;