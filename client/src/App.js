import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [report, setReport] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const baseUrl = "http://localhost:3001";
  const apiEndPoint = baseUrl + "/api/randomObjects";

  function generateFile() {
    if (report) {
      setReport(null);
    }
    if (fileName) {
      setFileName(null);
    }
    fetch(`${apiEndPoint}/generateFile`)
      .then((res) => res.json())
      .then((data) => {
        setFileName(data.fileName);
        setModalShow(true);
      });
  }

  function getReport() {
    fetch(`${apiEndPoint}/getCount`)
      .then((res) => res.json())
      .then((data) => setReport(data));
  }

  function CenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Success!

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A new file had been generated. Click 'Report' to fetch the random objects count.
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  React.useEffect(() => {
    fetch(apiEndPoint)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  })
  
  return (
    <Container className="p-3">
      <Alert variant="info">{!data ? "Loading..." : data}</Alert>
      <div className="mb-1"> 
        <Button onClick={generateFile}>Generate</Button> {' '}
        <Button onClick={getReport} variant="secondary">Report</Button>
      </div>
      <CenteredModal show={modalShow} onHide={() => {
        setModalShow(false);
        }}/>
      {fileName && 
        <Alert>Download link: {' '} 
          <Alert.Link href={baseUrl + "/" + fileName} target="_blank">{fileName}</Alert.Link>
        </Alert>}
      {report &&
        <Table responsive>
          <thead>
            <tr>
              <th>Object</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Alphabetical String</th>
              <th>{report.alphabets}</th>
            </tr>
            <tr>
              <th>Real Numbers</th>
              <th>{report.realNumbers}</th>
            </tr>
            <tr>
              <th>Integers</th>
              <th>{report.numbers}</th>
            </tr>
            <tr>
              <th>Alphanumerics</th>
              <th>{report.alphanumerics}</th>
            </tr>
          </tbody>
        </Table>
      }
    </Container>
  );
}

export default App;
