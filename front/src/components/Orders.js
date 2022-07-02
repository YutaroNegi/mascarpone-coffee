import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux'

function Orders(){
    const orders = useSelector((state) => state.order.orders)
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='box'>
          {orders.map((item)=>{
            return(
              <Accordion expanded={expanded === item.orderID} onChange={handleChange(item.orderID)} aria-controls={item.orderID} id={item.orderID}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography> Order #{item.orderID} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.coffee > 0 && <Typography>Coffee: {item.coffee}</Typography>}
                  {item.tea > 0 && <Typography> Tea: {item.tea}</Typography>}
                  {item.espresso > 0 && <Typography> Espresso: {item.espresso}</Typography>}
                  {item.hamburger > 0 ? <Typography> Hamburger: {item.hamburger}</Typography> : null}
                  {item.iceCream > 0 ? <Typography> Ice Cream: {item.iceCream}</Typography> : null}
                  {item.cake > 0 ? <Typography> Cake: {item.cake}</Typography> : null}
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      )
}

export default Orders;