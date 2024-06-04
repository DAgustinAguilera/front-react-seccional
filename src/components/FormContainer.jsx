import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'


export const FormContainer = () => {
  const [formData, setFormData] = useState({
    id: '',
    servicio: '',
    locomotora: '',
    siendo: '',
    nombre: '',
    junto: '',
    con: '',
    art: '',
    dia: '',
    observaciones: ''
  });

  const [data, setData] = useState({
    servicio: [],
    locomotora: [],
    siendo: [],
    conductores: [],
    pre: [],
    con: [],

  });

  const [nombreOptions, setNombreOptions] = useState([]); // Definir nombreOptions
  const [juntoOptions, setJuntoOptions] = useState([]);   // Definir juntoOptions

  useEffect(() => {
    fetch('http://localhost:5000/api/info')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  useEffect(() => {
    console.log('Updating options based on "siendo":', formData.siendo);
    if (formData.siendo === 'Conductor') {
      console.log('Setting options for conductor');
      setNombreOptions(data.conductores);
      setJuntoOptions(data.pre);
    } else if (formData.siendo === 'Pre-conductor') {
      console.log('Setting options for pre-conductor');
      setNombreOptions(data.pre);
      setJuntoOptions(data.conductores);
    } else {
      setNombreOptions([]);
      setJuntoOptions([]);
    }
    console.log('Nombre options:', nombreOptions);
    console.log('Junto options:', juntoOptions);
  }, [formData.siendo, data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const newId = uuidv4();

    fetch('http://localhost:5000/api/reportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData,
      id: newId,}
      ),

    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

        // Limpiar el formulario después de enviar
        setFormData({
          servicio: '',
          locomotora: '',
          siendo: '',
          nombre: '',
          junto: '',
          con: '',
          art: '',
          dia: '',
          observaciones: '',

        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte agregado correctamente",
        showConfirmButton: false,
        timer: 1500
      });
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <Card.Title>Reporte diario de servicio</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Complete los cuadros con la información correspondiente del servicio
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <h6>Primera Columna</h6>
                <Form.Group>
                  <Form.Label htmlFor="servicio">Usted realizó el servicio:</Form.Label>
                  <Form.Control as="select" id="servicio" value={formData.servicio} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {data.servicio.map((serv, index) => (
                      <option key={index} value={serv}>{serv}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="locomotora">Con la locomotora:</Form.Label>
                  <Form.Control as="select" id="locomotora" value={formData.locomotora} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {data.locomotora.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="siendo">Siendo usted:</Form.Label>
                  <Form.Control as="select" id="siendo" value={formData.siendo} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {data.siendo.map((s, index) => (
                      <option key={index} value={s}>{s}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="nombre">De nombre:</Form.Label>
                  <Form.Control as="select" id="nombre" value={formData.nombre} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {nombreOptions.map((nombre, index) => (
                      <option key={index} value={nombre}>{nombre}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="junto">Junto a:</Form.Label>
                  <Form.Control as="select" id="junto" value={formData.junto} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {juntoOptions.map((junto, index) => (
                      <option key={index} value={junto}>{junto}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="con">Con el guarda:</Form.Label>
                  <Form.Control as="select" id="con" value={formData.con} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    {data.con.map((g, index) => (
                      <option key={index} value={g}>{g}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <h6>Segunda Columna</h6>
                <Form.Group>
                  <Form.Label htmlFor="art">N° de ART:</Form.Label>
                  <Form.Control
                    type="text"
                    id="art"
                    placeholder="Ingrese N° de ART"
                    value={formData.art}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="dia">Día:</Form.Label>
                  <Form.Control type="date" id="dia" value={formData.dia} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <h6>Tercera Columna</h6>
                <Form.Group>
                  <Form.Label htmlFor="observaciones">Observaciones especiales:</Form.Label>
                  <Form.Control
                    className='mb-3'
                    as="textarea"
                    id="observaciones"
                    rows={5}
                    value={formData.observaciones}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" className="btn-block">
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
