import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from "react";



export default function ModalUser ({usuario}) {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    return (
        

        <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
        <h1>{usuario}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
        <p>
            
        </p>
      </Modal>
    );
  };


  