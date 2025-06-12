import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { variable64 } from "../../../public/assets/img";

(pdfMake as any).vfs = pdfFonts.vfs;

type Product = {
  nombre: string;
  cantidad: number;
  total: number;
};

const generatePDF = (
  imagenDorso:string,
  imagenFrontal:string
) => {



  const content: any[] = [];


  content.push({
  stack: [
    {
      image: imagenFrontal,
      width: 300,
      margin: [0, 40, 0, 0]
    },

    {
      text: 'Apellido',
      absolutePosition: { x: 130, y: 125 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      text: 'Nro',
      absolutePosition: { x: 210, y: 125 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      text: 'Nombre',
      absolutePosition: { x: 130, y: 150 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      text: 'Tipo',
      absolutePosition: { x: 130, y: 175 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      text: 'Direccion',
      absolutePosition: { x: 210, y: 175 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      text: 'Fecha Nac',
      absolutePosition: { x: 130, y: 200 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

    {
      image: imagenDorso,
      width: 300,
      margin: [0, 10, 0, 0]
    },

    {
      text: 'Clase',
      absolutePosition: { x: 130, y: 200 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },

  ]
});



  content.push({ text: "\n" });




  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
    subheader: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: "black",
    },
    total: {
      fontSize: 12,
      bold: true,
    },
  };


  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
