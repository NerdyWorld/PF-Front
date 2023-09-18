import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./OrderCard.module.css";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";



const OrderCard = ({order}) => {

  const state = useSelector(state => state.user);
  const { userOrders, user } = state;

  const handleInvoice = (order) =>{
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "myRivellePurchase",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "Rivelle Company",
          address: "Fashionlandia, BLS Street 3003. Paris, TKM1994.",
          phone: "+1 (786) 3003 2000",
          email: "rivellecompany@gmail.com",
          email_1: "rivellesupport@gmail.com",
          website: "rivelle.netlify.app",
      },
      contact: {
          label: "Invoice issued for:",
          name: user?.firstName + " " + user?.lastName,
          address: order.shippingAddress,
          email: user?.email
      },
      invoice: {
          label: "Order #: ",
          num: order.orderId,
          invDate: new Date().toLocaleDateString(),
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Title",
              style: {
                width: 30
              } 
            }, 
            { 
              title: "Brand",
              style: {
                width: 50
              } 
            }, 
            { title: "Price",
              style: {
                height: 50
              }
            },
            { title: "Quantity",
              style: {
                height: 50
              }
            },
            { title: "SKU",
              style: {
                height: 50
              }
            },
            { title: "Total",
              style: {
                height: 50
              }
            }
          ],
          table: Array.from(order.items, (item, index)=>([
              index + 1,
              item.name,
              item.brand,
              "$" + Number(item.price),
              Number(item.quantity),
              "lgh398d",
              "$" + Number(item.price) * Number(item.quantity)
          ])),
          additionalRows: [{
              col1: 'Total:',
              col2: "$" + order.totalPrice.toString(),
              style: {
                  fontSize: 12 //optional, default 12
              }
          }],
          invDescLabel: `Thank you ${user?.userName}!`,
          invDesc: "Thank you for choosing Rivélle, where luxury meets style. Your purchase not only supports our passion for high fashion but also allows us to continue curating exceptional pieces for discerning individuals like you.",
      },
      footer: {
          text: "All rights reserved @ Rivelle 2023",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    const pdfCreated = jsPDFInvoiceTemplate(props); 

    const pdfObject = pdfCreated.jsPDFDocObject;

    console.log(pdfObject);
  };

  const [showDetails, setShowDetails] = useState(false);


  return ( 
    <div className={styles.eachOrder}>
      <div className={styles.orderTop}>
        <span className={styles.orderId}>{order.orderId}</span>
        <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</span>
        <span className={styles.orderPurchase}><span className={styles.purchased}>{order.orderStatus}</span>  &nbsp;Website - Client Services</span>
        <div className={styles.orderGrow}></div>
        <span className={styles.orderLength}>{order.items.length} Items</span>
        <span className={styles.orderTotal}>${order.totalPrice}</span>
      </div>
      <div className={`${showDetails ? styles.orderMiddle2 : styles.orderMiddle}`}>
        {
          showDetails ? (
            order.items.map(el => {
              return(
                <div className={styles.orderMiddleContainer2}>
                  <div className={styles.orderMiddleImg2}>
                    <img src={el.images[0]} alt="abc" />
                  </div>
                  <div className={styles.orderMiddleDetails2}>
                    <div className={styles.orderNameContainer}>
                      <div className={styles.orderName}>
                        <span>{el.name}</span>
                        <span>{el.brand}</span>
                      </div>
                      <span className={styles.orderPrice}>${el.price}</span>
                    </div>
                    <div className={styles.orderDetailsSubColumn}>
                      <span className={styles.orderSKU}><span>SKU:</span> {el.SKU || "lg37cj98"}</span>
                      <span className={styles.orderQuantity}><span>Quantity:</span> {el.quantity}</span>
                      <span className={styles.orderColor}><span>Color:</span> {el.color}</span>
                      <span className={styles.orderSize}><span>Size:</span> {el.size}</span>
                    </div>
                  </div>
                </div>
              )
            })
          ):(
            order.items.map(el => {
              return(
                <div className={styles.orderMiddleContainer}>
                  <div className={styles.orderMiddleImg}>
                    <img src={el.images[0]} alt="abc" />
                  </div>
                  <div className={styles.orderMiddleDetails}>
                    <span>{el.name}</span>
                    <span>{el.brand}</span>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
      <div className={styles.orderBottom}>
        <button onClick={()=> handleInvoice(order)}>
          <svg viewBox="0 0 80 80" focusable="false" aria-hidden="true" class="ui-icon-controls-download"><g fill-rule="evenodd"><path d="M36.5 0h7v49.6l8.728-8.728 4.95 4.95L44.95 58.05 40 63l-4.95-4.95-12.228-12.228 4.95-4.95L36.5 49.6V0zM20 80v-7h40v7H20z"></path></g></svg>
          Download Invoice
        </button>
        <span onClick={()=> setShowDetails(!showDetails)}>More Details</span>
      </div>
    </div>
   );
}
 
export default OrderCard;