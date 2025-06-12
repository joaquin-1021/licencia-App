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
  imagenFrontal:string,
  imagenCuadrado:string,
  imagenHorizonal:string,
  datosFormulario:Object
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
      absolutePosition: { x: 255, y: 300 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },
    {
      text: 'Donante',
      absolutePosition: { x: 130, y: 355 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },
    {
      text: 'Grupo',
      absolutePosition: { x: 200, y: 355 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },
    {
      text: 'Cuit',
      absolutePosition: { x: 255, y: 355 },
      color: 'black',
      fontSize: 10,
      bold: true,
      fillColor: 'rgba(39,55,70)',
      margin: [0, -40, 0, 0]
    },
    
    {
      image: imagenCuadrado,
      absolutePosition: { x: 65, y: 280 },
      width: 58,
    },
    {
      image: imagenHorizonal,
      absolutePosition: { x: 70, y: 400 },
      width: 240,
      height: 54
    },


  ]
  });

  for (const [clave, valor] of Object.entries(datosFormulario)) {
    if(clave == 'nombre'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 132, y: 160 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'apellido'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 132, y: 135 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'tipoDocumento'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 132, y: 185 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'nroDocumento'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 212, y: 135 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'fechaNacimiento'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 132, y: 210 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'direccion'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 212, y: 185 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'donante'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 132, y: 365 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'grupoSangre'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 202, y: 365 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'clase'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 257, y: 310 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    if(clave == 'cuit'){
      content.push({
        text: `${valor}`,
        absolutePosition: { x: 257, y: 365 },
        color: 'black',
        fontSize: 10,
        bold: true,
        fillColor: 'rgba(39,55,70)',
        margin: [0, -40, 0, 0]
      });
    }
    
  }


  const docDefinition: any = {
    content
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
