import React, { useState } from 'react';
import RoomForm from './component/RoomForm';
import Room from './Room';
import Header from './component/Header';
import Footer from './component/Footer';
import HowToUse from './component/HowToUse';

function RoomContainer(props) {
    const isEnter = props.isEnter;
    if (isEnter) {
        return <Room />;
    }
    return <RoomForm />;
}

const App = () => {
    const [isEnter, setIsEnter] = useState(false);
    return (
        <>
            <Header />
            <RoomContainer isEnter={isEnter} />
            <HowToUse />
            <Footer />
        </>
    );
}

export default App;
