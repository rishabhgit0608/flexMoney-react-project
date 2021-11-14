import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_INFORMATION, UPDATE_PAYMENT } from "./graphQL/graphql";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function App() {
  //states define
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(18);
  const [batch, setBatch] = React.useState("6-7AM");
  const [error, setError] = React.useState("");
  const [payment, setPayment] = React.useState(false);
  const [userID, setUserId] = React.useState(0);

  //pre-requisites
  const ageNum = [];
  for (let i = 18; i <= 65; i++) {
    ageNum.push(i);
  }
  const batches = ["6-7AM", "7-8AM", "8-9AM", "5-6PM"];
  useEffect(() => {
    if (name.length <= 3) {
      setError("name must be atlesat 3 characters");
    } else {
      setError("");
    }
  }, [name]);

  //mutations
  const [updatingDatabase] = useMutation(UPDATE_INFORMATION, {
    onCompleted: () => {
      toast.success(
        `Registered Successfully! See you tomorrow at ${batch.slice(
          0,
          1
        )}${batch.slice(3, 6)}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setName("");
      setAge(18);
      setBatch("6-7AM");
      setPayment(false);
      setUserId(0);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
  const [updatingDatabasePayment] = useMutation(UPDATE_PAYMENT, {
    onCompleted: () => {
      toast.success(`payment successfully done`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  //handle events
  const handleSubmission = () => {
    const object = {
      Age: age,
      Batch: batch,
      Id: userID,
      Name: name,
    };
    updatingDatabase({
      variables: {
        object,
      },
    });
  };

  const completePayment = () => {
    const id = Math.floor(Math.random() * 1000);
    setUserId(id);
    console.log(id + " payment");
    setPayment(true);
    const object = {
      id,
      payment_status: true,
    };
    updatingDatabasePayment({
      variables: { object },
    });
  };

  return (
    <Container>
      <Popup
        trigger={
          <Button variant="contained" color="secondary" size="small">
            ER-diagram-for-DB
          </Button>
        }
        modal
        closeOnEscape
        position="right center"
      >
        <ERDLogo src="https://i.ibb.co/8zKbKPb/erd.png" />
      </Popup>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FormContainer>
        <FormHeader>
          <Logo src="https://i.ibb.co/16rr4Kj/Screenshot-from-2021-11-14-17-37-36.png" />
        </FormHeader>
        <TextField
          name="Name"
          label="Name"
          placeholder="Name"
          type="text"
          variant="outlined"
          required="true"
          helperText={error}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "20px", width: "30vw" }}
        />
        <TextField
          id="filled-select-age"
          select
          label="Age select"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          SelectProps={{
            native: true,
          }}
          required="true"
          helperText="Please enter your age"
          variant="filled"
          style={{ width: "30vw" }}
        >
          {ageNum.map((option) => (
            <option key={option.value} value={option.value}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          id="filled-select-batch"
          select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          SelectProps={{
            native: true,
          }}
          required="true"
          helperText="Please select your batch"
          variant="filled"
          style={{ marginBottom: "10px", width: "30vw" }}
        >
          {batches.map((option, i) => (
            <option key={i} value={option.value}>
              {option}
            </option>
          ))}
        </TextField>
        <h3>Fees for the program ₹500 </h3>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "20px", width: "10vw" }}
          onClick={completePayment}
          disabled={name.length >= 3 && payment == false ? false : true}
        >
          {payment ? "PAID" : "Payment"}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "20vw" }}
          onClick={handleSubmission}
          disabled={name.length >= 3 && payment == true ? false : true}
        >
          Enroll
        </Button>
      </FormContainer>
    </Container>
  );
}
//styled Components CSS
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  height: 85vh;
  width: 75vw;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;
const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ERDLogo = styled.img`
  height: 500px;
  width: 900px;
`;
