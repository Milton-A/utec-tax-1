import React, { createContext, useState } from 'react';
import authService from './auth';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [user1, setUser1] = useState({ idUser: 0 });
  const [originCoordinates, setOriginCoordinates] = useState(0);
  const [destinationCoordinates, setDestinationCoordinates] = useState(0);
  const [driverCoordinates, setDriverCoordinates] = useState("");
  const [distance, setDistance] = useState(0);
  const [posVeiculo, setPosVeiculo] = useState(0);
  const [driver, setDriver] = useState({ idMotorista: 0 });
  const [veiculoId, setVeiculoId] = useState({ idVeiculo: 0 });
  const [viagem, setViagem] = useState({ tempoEstimado: 0, tempoReal: 0, custoReal: 0.0, custoEstimado: 0.0});
  const [userName, setUserName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showDestinationInfo, setShowDestinationInfo] = useState(false);
  const [ajuste, setAjuste] = useState(false);
  const [motorista, setMotorista] = useState({});
  const [cliente, setCliente] = useState({});
  const [fiabilidade, setFiabilidade] = useState(0.0);

  const getDriver = (id) => {
    setDriver({ idMotorista: id })
  }

  const getVeiculoId = (id) => {
    setVeiculoId({ idVeiculo: id })
  }

  const getViagem = (tempoEstimad, TempoRea, custoEstimad, custoRea) => {
    setViagem({
      tempoEstimado: tempoEstimad,
      tempoReal: TempoRea,
      custoEstimado: custoEstimad,
      custoReal: custoRea
    });
  }

  const getUser1 = (id) => {
    setUser1({ idUser: id })
  }
  const getNome = (nome) => {
    setUserName({ nome: nome });
  }

  return (
    <AuthContext.Provider
      value={{
        name: 'user',
        getNome,
        userName,
        driver,
        user1,
        getUser1,
        IP: 'http://172.20.10.7:3000',
        setOriginCoordinates,
        setDestinationCoordinates,
        setDriverCoordinates,
        originCoordinates,
        destinationCoordinates,
        driverCoordinates,
        setOrigin,
        origin,
        getDriver,
        showDestinationInfo,
        setShowDestinationInfo,
        destination, setDestination,
        posVeiculo, setPosVeiculo,
        veiculoId, getVeiculoId,
        viagem, getViagem,
        ajuste, setAjuste,
        cliente, setCliente,
        motorista, setMotorista,
        usuario, setUsuario,
        fiabilidade, setFiabilidade
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
