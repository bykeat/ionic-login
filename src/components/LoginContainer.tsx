import React from "react";
import { IonInput, IonLabel, IonItem, IonButton } from "@ionic/react";
interface LoginProps {}

const LoginContainer: React.FC<LoginProps> = () => {
  return (
    <div className="container">
      <IonItem>
        <IonLabel>Login ID:</IonLabel>
        <IonInput type="text" placeholder="Enter Login ID"></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Password:</IonLabel>
        <IonInput type="text" placeholder="Enter Password"></IonInput>
      </IonItem>

      <IonButton onClick={() => {}}>Login</IonButton>
      <IonButton routerLink="/signup">Sign Up</IonButton>
    </div>
  );
};

export default LoginContainer;
