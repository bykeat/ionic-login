import React, { useState, useEffect } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonItemDivider,
  IonAlert,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./LoginContainer.css";
interface SignUpProps {}

const SignUpContainer: React.FC<SignUpProps> = () => {
  const history = useHistory();
  const [signUpStatus, setSignUp] = useState(false);
  const [signup, changeSignUpData] = useState({
    id: "",
    pwd: "",
    cpwd: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    redirect: "",
  });
  useEffect(() => {
    if (signUpStatus) {
      fetch(
        `https://pure-bastion-59348.herokuapp.com/register?id=${signup.id}&pwd=${signup.pwd}&name=${signup.name}`
      )
        .then((res) => {
          if (res.ok) {
            return res.text();
          } else {
            console.error("response error");
            setLoading(false);
          }
        })
        .then((data) => {
          console.log(data);
          let jsonObj = JSON.parse(data ? data : "");
          if (jsonObj.success)
            setAlert({
              ...alert,
              show: true,
              message: "Account successfully registered.",
              redirect: "/home",
            });
          else
            setAlert({
              ...alert,
              show: true,
              message: "Email already registered.",
              redirect: "",
            });
          setLoading(false);
        });
      setSignUp(false);
    }
  });

  const createAccount = () => {
    setLoading(true);
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(signup.id)) {
      setAlert({
        ...alert,
        show: true,
        message: "Please check your email is valid.",
        redirect: "",
      });
      setLoading(false);
    }

    if (signup.cpwd !== signup.pwd || signup.pwd === "" || signup.cpwd === "") {
      setAlert({
        ...alert,
        show: true,
        message: "Password did not match or empty.",
        redirect: "",
      });
      setLoading(false);
    } else if (signup.name === "") {
      setAlert({
        ...alert,
        show: true,
        message: "Name is empty.",
        redirect: "",
      });
      setLoading(false);
    } else {
      setSignUp(true);
    }
  };
  return (
    <div className="container">
      <IonItem>
        <IonLabel>Email Address:</IonLabel>
        <IonInput
          type="email"
          required={true}
          placeholder="Enter email address"
          onIonChange={(e) => {
            changeSignUpData({
              ...signup,
              id: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Name:</IonLabel>
        <IonInput
          type="text"
          required={true}
          placeholder="Enter your name"
          onIonChange={(e) => {
            changeSignUpData({
              ...signup,
              name: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Password:</IonLabel>
        <IonInput
          type="password"
          required={true}
          placeholder="Enter password"
          onIonChange={(e) => {
            changeSignUpData({
              ...signup,
              pwd: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Confirm Password:</IonLabel>
        <IonInput
          type="password"
          id="test"
          placeholder="Repeat password"
          onIonChange={(e) => {
            changeSignUpData({
              ...signup,
              cpwd: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>
      <IonToast
        message={alert.message}
        onDidDismiss={() => {
          if (alert.redirect.length > 0) {
            history.push(alert.redirect);
          }
          setAlert({ show: false, message: "", redirect: "" });
        }}
        isOpen={alert.show}
        buttons={[
          {
            text: "Okay",
          },
        ]}
        duration={3000}
      ></IonToast>
      <IonButton routerLink="home">Back</IonButton>
      <IonButton
        type="submit"
        onClick={() => {
          createAccount();
        }}
      >
        Submit
      </IonButton>
      <IonSpinner hidden={!loading}></IonSpinner>
    </div>
  );
};

export default SignUpContainer;
