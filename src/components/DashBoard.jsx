import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [inputValues, setInputValues] = useState({
    conductores: "",
    preconductores: "",
    guardas: "",
    servicios: "",
    locomotoras: "",
  });

  const [conductores, setConductores] = useState([]);
  const [preconductores, setPreconductores] = useState([]);
  const [guardas, setGuardas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [locomotoras, setLocomotoras] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET al endpoint para obtener los datos
    fetch("http://localhost:5000/api/info")
      .then((response) => response.json())
      .then((data) => {
        setConductores(data.conductores);
        setPreconductores(data.pre);
        setGuardas(data.con);
        setServicios(data.servicio);
        setLocomotoras(data.locomotora);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (type, id) => {
    fetch(`http://localhost:5000/api/${type}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          switch (type) {
            case "conductores":
              setConductores((prevState) =>
                prevState.filter((conductor) => conductor !== id)
              );
              break;
            case "preconductores":
              setPreconductores((prevState) =>
                prevState.filter((preconductor) => preconductor !== id)
              );
              break;
            case "guardas":
              setGuardas((prevState) =>
                prevState.filter((guarda) => guarda !== id)
              );
              break;
            case "servicios":
              setServicios((prevState) =>
                prevState.filter((servicio) => servicio !== id)
              );
              break;
            case "locomotoras":
              setLocomotoras((prevState) =>
                prevState.filter((locomotora) => locomotora !== id)
              );
              break;
            default:
              break;
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dato eliminado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          // Recargar los datos después de la eliminación
          fetch("http://localhost:5000/api/info")
            .then((response) => response.json())
            .then((data) => {
              setConductores(data.conductores);
              setPreconductores(data.pre);
              setGuardas(data.con);
              setServicios(data.servicio);
              setLocomotoras(data.locomotora);
            })
            .catch((error) => console.error("Error fetching data:", error));
        } else {
          console.error("Error deleting element from server");
        }
      })
      .catch((error) => console.error("Error deleting element:", error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePush = (type, id) => {
    if (!id) {
      console.error("ID is undefined or empty");
      return;
    }
    fetch(`http://localhost:5000/api/${type}/${id}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Successfully added ${type} with ID ${id}`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Dato agregado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          // Recargar los datos después de agregar
          fetch("http://localhost:5000/api/info")
            .then((response) => response.json())
            .then((data) => {
              setConductores(data.conductores);
              setPreconductores(data.pre);
              setGuardas(data.con);
              setServicios(data.servicio);
              setLocomotoras(data.locomotora);
            })
            .catch((error) => console.error("Error fetching data:", error));
          // Reiniciar los valores del input después de agregar
          setInputValues((prevValues) => ({
            ...prevValues,
            [type]: "",
          }));
        } else {
          console.error("Error adding element to server");
        }
      })
      .catch((error) => console.error("Error adding element:", error));
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">Eliminar información</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="conductores">Conductores:</Form.Label>
                <Form.Control as="select" id="conductores">
                  <option value="">Seleccione...</option>
                  {conductores.map((conductor) => (
                    <option key={conductor} value={conductor}>
                      {conductor}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="m-2"
                variant="danger"
                onClick={() =>
                  handleDelete(
                    "conductores",
                    document.getElementById("conductores").value
                  )
                }
              >
                Eliminar
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="preconductores">
                  preconductores:
                </Form.Label>
                <Form.Control as="select" id="preconductores">
                  <option value="">Seleccione...</option>
                  {preconductores.map((pre) => (
                    <option key={pre} value={pre}>
                      {pre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="m-2"
                variant="danger"
                onClick={() =>
                  handleDelete(
                    "pre",
                    document.getElementById("preconductores").value
                  )
                }
              >
                Eliminar
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="guardas">Guardas:</Form.Label>
                <Form.Control as="select" id="guardas">
                  <option value="">Seleccione...</option>
                  {guardas.map((guarda) => (
                    <option key={guarda} value={guarda}>
                      {guarda}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="m-2"
                variant="danger"
                onClick={() =>
                  handleDelete(
                    "conductores",
                    document.getElementById("conductores").value
                  )
                }
              >
                Eliminar
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="servicios">Servicios:</Form.Label>
                <Form.Control as="select" id="servicios">
                  <option value="">Seleccione...</option>
                  {servicios.map((servicio) => (
                    <option key={servicio} value={servicio}>
                      {servicio}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="m-2"
                variant="danger"
                onClick={() =>
                  handleDelete(
                    "preconductores",
                    document.getElementById("preconductores").value
                  )
                }
              >
                Eliminar
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="locomotoras">Locomotoras:</Form.Label>
                <Form.Control as="select" id="locomotoras">
                  <option value="">Seleccione...</option>
                  {locomotoras.map((locomotora) => (
                    <option key={locomotora} value={locomotora}>
                      {locomotora}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="m-2"
                variant="danger"
                onClick={() =>
                  handleDelete(
                    "conductores",
                    document.getElementById("conductores").value
                  )
                }
              >
                Eliminar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col>
          <Card Card className="mt-2">
            <Card.Header as="h5">Agregar informacion</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="conductores">Conductores:</Form.Label>
                    <Form.Control
                      id="conductores"
                      type="text"
                      name="conductores"
                      value={inputValues.conductores}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="m-2"
                    variant="success"
                    onClick={() =>
                      handlePush("conductores", inputValues.conductores)
                    }
                  >
                    Agregar
                  </Button>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="preconductores">
                      preconductores:
                    </Form.Label>
                    <Form.Control
                      id="preconductores"
                      type="text"
                      name="preconductores"
                      value={inputValues.preconductores}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="m-2"
                    variant="success"
                    onClick={() =>
                      handlePush("pre", inputValues.preconductores)
                    }
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card Card className="mt-2">
            <Card.Header as="h5">Agregar informacion</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="guardas">guardas:</Form.Label>
                    <Form.Control
                      id="guardas"
                      type="text"
                      name="guardas"
                      value={inputValues.guardas}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="m-2"
                    variant="success"
                    onClick={() => handlePush("guardas", inputValues.guardas)}
                  >
                    Agregar
                  </Button>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="locomotoras">locomotoras:</Form.Label>
                    <Form.Control
                      id="locomotoras"
                      type="text"
                      name="locomotoras"
                      value={inputValues.locomotoras}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="m-2"
                    variant="success"
                    onClick={() =>
                      handlePush("locomotoras", inputValues.locomotoras)
                    }
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card Card className="mt-2">
            <Card.Header as="h5">Agregar informacion</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="servicios">servicios:</Form.Label>
                    <Form.Control
                      id="servicios"
                      type="text"
                      name="servicios"
                      value={inputValues.servicios}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="m-2"
                    variant="success"
                    onClick={() =>
                      handlePush("servicios", inputValues.servicios)
                    }
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
