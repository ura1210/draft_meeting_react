import React, { useState } from "react";
import RoomForm from "./component/RoomForm";
import Room from "./Room";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HowToUse from "./component/HowToUse";
import { io } from "socket.io-client";

const socket = io();

function RoomContainer(props) {
  if (props.isEnter) {
    return <Room socket={socket} roomInfo={props.roomInfo} />;
  }
  return <RoomForm socket={socket} setIsEnter={props.setIsEnter} />;
}

const App = () => {
  const [isEnter, setIsEnter] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    name: "defoname",
    roomID: "deforoomID",
    title: "defotitle",
    draftLists: [
      "minoeu1",
      "minoru2",
      "minoeu1",
      "minoru2",
      "minoeu1",
      "minoru2",
      "minoeu1",
      "minoru2",
      "minoru2",
      "minoeu1",
      "minoru2",
      "minoru2",
      "minoeu1",
      "minoru2",
    ],
    endOrder: 10,
  });

  return (
    <>
      <Header />
      <Room socket={socket} roomInfo={roomInfo} />
      <RoomContainer
        isEnter={isEnter}
        setIsEnter={setIsEnter}
        setRoomInfo={setRoomInfo}
        roomInfo={roomInfo}
      />
      <HowToUse />
      <Footer />
    </>
  );
};

export default App;
