import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SymptomTable } from "../Symptoms/SymptomTable";
import { Login } from "../Auth/Login"
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface Props {
  closeSymptomsMenu: () => void;
}

export const SymptomsMenu = ({ closeSymptomsMenu }: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });
  });

  return (
    <Overlay>
      { loggedIn
        ? <Container>
            <SymptomTable />
            <Buttons>
              <CloseButton onClick={closeSymptomsMenu}>Sulje</CloseButton>
              <SaveButton onClick={closeSymptomsMenu}>Tallenna</SaveButton>
            </Buttons>
          </Container>
        : <Container>
          <Login />
        </Container>
      }
    </Overlay>
  );
};

const Overlay = styled.div`
  background: hsla(0, 0%, 0%, 0.4);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  position: absolute;
  overflow-y: scroll;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.5rem;
  background: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  align-self: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 1rem;
  border-radius: 50px;
  font-size: 16px;
  border: none;
  background: none;
`;

const CloseButton = styled(Button)`
  border: 1px solid #ccc;
`;

const SaveButton = styled(Button)`
  background: hsl(190, 60%, 40%);
  color: white;
`;
