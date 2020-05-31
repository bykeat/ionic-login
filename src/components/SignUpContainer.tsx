import React, { useState } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonItemDivider,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";
interface SignUpProps {}

const SignUpContainer: React.FC<SignUpProps> = () => {
  const history = useHistory();
  const [login, changeLoginData] = useState({
    id: "",
    pwd: "",
    cpwd: "",
    o: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    redirect: "",
  });

  const createAccount = () => {
    console.log("submitted data", login);
    if (login.cpwd !== login.pwd || login.pwd === "" || login.cpwd === "") {
      setAlert({
        ...alert,
        show: true,
        message: "Password did not match or empty.",
      });
    } else {
      const payload = {
        id: login.id,
        pwd: login.pwd,
      };

      setAlert({
        ...alert,
        show: true,
        message: "Account successfully registered.",
        redirect: "/home",
      });
    }
  };
  return (
    <div className="container">
      <IonItem>
        <IonLabel>Login ID:</IonLabel>
        <IonInput
          type="text"
          required={true}
          placeholder="Enter Login ID"
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
          required={true}
          placeholder="Enter Password"
          onIonChange={(e) => {
            //changePassword();
            changeLoginData({
              ...login,
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
          placeholder="Repeat Password"
          onIonChange={(e) => {
            console.log(e.detail.value);
            changeLoginData({
              ...login,
              cpwd: e.detail.value ? e.detail.value : "",
            });
          }}
        ></IonInput>
      </IonItem>
      <IonAlert
        message={alert.message}
        onDidDismiss={() => {
          if (alert.redirect !== "") {
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
      ></IonAlert>
      <IonButton routerLink="home">Back</IonButton>
      <IonButton
        type="submit"
        onClick={() => {
          createAccount();
        }}
      >
        Submit
      </IonButton>
    </div>
  );
};

export default SignUpContainer;
