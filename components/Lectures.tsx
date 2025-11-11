import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { lectureFiles } from '../constants';

const Lectures: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Lecture Materials</h1>
        <p className="lead text-muted">Download the PDF files for each chapter to study offline.</p>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {lectureFiles.map((file, index) => (
          <Col key={index}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="mb-3">{file.title}</Card.Title>
                <Button 
                  variant="primary" 
                  href={file.filePath} 
                  download 
                  // The button is disabled until actual file paths are provided.
                  disabled={file.filePath.includes('/path/to/')}
                >
                  Download PDF
                </Button>
              </Card.Body>
               <Card.Footer className="text-muted">
                {file.filePath.includes('/path/to/') ? "File not available yet" : "Ready to download"}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Lectures;