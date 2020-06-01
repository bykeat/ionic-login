import React, { useState, useEffect } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonAlert,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import "./LoginContainer.css";
interface LoginProps {}

const LoginContainer: React.FC<LoginProps> = () => {
  const [login, changeLoginData] = useState({ id: "", pwd: "" });
  const [calledLogin, setLogin] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (calledLogin) {
      setAlert({
        show: false,
        message: "",
      });

      fetch(
        //`https://pure-bastion-59348.herokuapp.com/login?id=${login.id}&pwd=${login.pwd}`,
        `https://pure-bastion-59348.herokuapp.com/login?id=${login.id}&pwd=${login.pwd}`,
        {
          //body: JSON.stringify(login),
        }
      )
        .then((res) => {
          if (!res.ok) {
            console.error("response failed");
          } else {
            return res.text();
          }
        })
        .then((data) => {
          let jsonObj = JSON.parse(data ? data : "");
          setAlert({
            show: true,
            message: `${jsonObj ? jsonObj.message : ""}`,
          });
          setLoading(false);
        })
        .catch((e) => {
          setAlert({ show: true, message: "Invalid login." });

          setLoading(false);
        });
      setLogin(false);
    }
  });
  return (
    <div className="container">
      <IonItem>
        <IonLabel>Email Address:</IonLabel>
        <IonInput
          type="email"
          placeholder="Enter Email"
          onIonChange={(e) => {
            changeLoginData({
              ...login,
              id: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel>Password:</IonLabel>
        <IonInput
          type="password"
          placeholder="Enter Password"
          onIonChange={(e) => {
            changeLoginData({
              ...login,
              pwd: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>

      <IonButton
        onClick={() => {
          setLogin(true);
          setLoading(true);
        }}
      >
        Login
      </IonButton>
      <IonToast
        message={alert.message}
        onDidDismiss={() => {
          setAlert({ show: false, message: "" });
        }}
        duration={3000}
        isOpen={alert.show}
      ></IonToast>
      <IonButton routerLink="/signup">Sign Up</IonButton>
      <IonSpinner
        className={!loading ? "hide" : ""}
        name="crescent"
      ></IonSpinner>
    </div>
  );
};

export default LoginContainer;
