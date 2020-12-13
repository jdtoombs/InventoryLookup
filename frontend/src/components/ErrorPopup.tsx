import React, { useEffect, useState } from 'react';
import { Popup } from './Popup';

const ErrorPopup = (props: any) => {
    const [show, setShow] = useState(false);
    useEffect(()=> {
        if(props.error){
            setShow(true)
        }
    }, [props.error])
    return (
    <Popup title="App Error" body={props.error.message} show={show} />
  );
};

export default ErrorPopup;
