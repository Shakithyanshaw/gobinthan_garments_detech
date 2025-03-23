import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function WhatsAppInstructions({ show, onClose, fileName }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send PDF via WhatsApp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>WhatsApp should have opened automatically</li>
          <li>If not, open WhatsApp manually</li>
          <li>Attach the PDF file ({fileName}) from your downloads</li>
          <li>Send the message</li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
