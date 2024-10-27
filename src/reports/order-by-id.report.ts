import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { CurrencyFormatter, DateFormatte } from "src/helpers";
import { footerSection } from "./sections/footer.section";
import { CompleteOrder } from "src/interfaces";

const logo:Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20]
};

const styles:StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 10]
  }
};

interface OrderValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (values: OrderValues):TDocumentDefinitions => {

  const { data } = values;
  const { customers, order_date, order_details, order_id} = data;

  const subtotal = order_details.reduce((acc, detail) => acc + detail.quantity * +detail.products.price, 0);
  const totall = subtotal * 1.16; // 16% IVA

  return {
    styles: styles,
    header: logo,
    pageMargins: [ 40, 60, 40, 60 ],
    footer: footerSection,
    content: [
      // Headers
      {
        text: `${customers.contact_name}`,
        style: 'header'
      },
      // Address
      {
        columns: [
          {
            text: `${customers.address}.
            ${customers.country}-${customers.city}. 
            ${customers.postal_code}
            https://tucancode.com\n`,
          },
          {
            text: [
              {text: `Reciept #: ${order_id} \n`, bold: true},
              `Fecha: ${DateFormatte.getDDMMYYYY(order_date)}
              Pagar: ${DateFormatte.getDDMMYYYY(new Date())}\n`,
            ],
            alignment: 'right'
          }
        ]
      },
      // Qr
      {
        qr: 'https://google.com',
        fit: 80,
        alignment: 'right',
      },
      // Dirrections client
      {
        text: [
          {text: `Cobrar a:\n`, bold: true},
          `John Doe\n`,
          {text: `Direccion: \n`, bold: true},
          `15 Montgometry St. \n`,
        ]
      },
      // Table if details order
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [ 50, '*', 'auto', 'auto' , 'auto' ],
          body: [
            [ 'ID', 'Descripción', 'Cantidad', 'Precio', 'Total' ],
            ...order_details.map((detail) => {
              const { product_id, products, quantity } = detail;
              const { product_name, price} = products;
              return [
                product_id,
                product_name,
                quantity,
                CurrencyFormatter.formatCurrency(+price),
                CurrencyFormatter.formatCurrency(+price*quantity)
              ];
            })
          ]
        }
      },
      // Salto de linea
      {
        text: '\n'
      },
      // Total
      {
        text: [
          {text: 'Subtotal: '},
          CurrencyFormatter.formatCurrency(subtotal),
          {
            text: '\nTotal: ', 
            bold: true
          },
          CurrencyFormatter.formatCurrency(totall)
        ],
        alignment: 'right',
        margin: [0, 20]
      }
    ]
  }
};