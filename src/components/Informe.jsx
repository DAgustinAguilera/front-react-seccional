import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import templatePdf from "../assets/informe.pdf"; // Asegúrate de que la ruta sea correcta
import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";

const Informe = () => {

  const [formData, setFormData] = useState({
    name: "",
    dia: "",
    desarrolle: "",
    mes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const generatePdf = async () => {
    // Fetch the PDF template
    const existingPdfBytes = await fetch(templatePdf).then((res) =>
      res.arrayBuffer()
    );

    // Load the PDF template
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw the form data on the first page with custom interlineado
    drawTextWithInterlineado(firstPage, formData.desarrolle, {
      x: 95,
      y: 608,
      size: 11,
      color: rgb(0, 0, 0),
      interlineado: 15.7, // Ajusta el valor según el espaciado deseado
    });

    firstPage.drawText(`${formData.name}`, {
      x: 130,
      y: 300,
      size: 11,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`Saludos cordeales`, {
      x: 95,
      y: 450,
      size: 11,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.mes}`, {
      x: 210,
      y: 321,
      size: 11,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${formData.dia}`, {
      x: 153,
      y: 321,
      size: 11,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a link element, set its href to the blob URL, and click it to trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filled-template.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePdf();
  };

  // Función para dibujar texto con control de interlineado
  const drawTextWithInterlineado = (page, text, options) => {
    const { x, y, size, color, interlineado } = options;
    const lines = splitTextByWords(text, 13); // Cambia 10 por el número de palabras por línea deseado
    let yPos = y;
    lines.forEach((line) => {
      page.drawText(line, {
        x,
        y: yPos,
        size,
        color,
      });
      yPos -= interlineado;
    });
  };

  // Función para dividir el texto en líneas según el número de palabras deseado
  const splitTextByWords = (text, wordsPerLine) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    words.forEach((word, index) => {
      if ((index + 1) % wordsPerLine === 0) {
        lines.push(currentLine.trim());
        currentLine = "";
      }
      currentLine += word + " ";
    });
    if (currentLine.trim() !== "") {
      lines.push(currentLine.trim());
    }
    return lines;
  };
  return (
    <Container className="mt-5">
      <Card>
        <CardHeader>
          <h1 className="mb-4">Generador de Informes</h1>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="desarrolle">Desarrolle</Form.Label>
              <Form.Control
                as="textarea"
                id="desarrolle"
                rows={5}
                value={formData.desarrolle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Nombre completo</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="dia">Dia</Form.Label>
              <Form.Control
                type="number"
                id="dia"
                value={formData.dia}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="mes">Mes</Form.Label>
              <Form.Control
                type="text"
                id="mes"
                value={formData.mes}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Generar informe
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
export default Informe;
