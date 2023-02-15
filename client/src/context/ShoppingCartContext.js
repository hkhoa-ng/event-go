import { createContext, useState } from 'react';
import axios from 'axios';

const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
  const [shoppingCartTickets, setShoppingCartTickets] = useState([
    // {
    //   eventName: '',
    //   eventImage: '',
    //   eventId: 0,
    //   ticketType: '',
    //   price: 0,
    //   quantity: 0,
    // },
  ]);

  //   const addToCart = (eventName, ticketType, price, quantity) => {
  // Add new tickets to cart (from EventDetails page)
  function addToCart(eventName, image, eventId, ticketType, price, quantity) {
    const existingTicket = shoppingCartTickets.find(
      ticket =>
        ticket.eventName === eventName && ticket.ticketType === ticketType
    );
    if (existingTicket) {
      setShoppingCartTickets(
        shoppingCartTickets.map(ticket =>
          ticket === existingTicket
            ? { ...ticket, quantity: ticket.quantity + quantity }
            : ticket
        )
      );
    } else {
      setShoppingCartTickets([
        ...shoppingCartTickets,
        {
          eventName: eventName,
          image: image,
          eventId: eventId,
          ticketType: ticketType,
          price: price,
          quantity: quantity,
        },
      ]);
    }
  }

  // Add one ticket of type to cart (from Cart)
  function addOneToCart(eventName, ticketType) {
    const existingTicket = shoppingCartTickets.find(
      ticket =>
        ticket.eventName === eventName && ticket.ticketType === ticketType
    );
    if (existingTicket) {
      setShoppingCartTickets(
        shoppingCartTickets.map(ticket =>
          ticket === existingTicket
            ? { ...ticket, quantity: ticket.quantity + 1 }
            : ticket
        )
      );
    }
  }

  // Remove one ticket of type to cart (from Cart)
  function removeOneFromCart(eventName, ticketType) {
    const existingTicket = shoppingCartTickets.find(
      ticket =>
        ticket.eventName === eventName && ticket.ticketType === ticketType
    );
    if (existingTicket && existingTicket.quantity > 0) {
      setShoppingCartTickets(
        shoppingCartTickets.map(ticket =>
          ticket === existingTicket
            ? { ...ticket, quantity: ticket.quantity - 1 }
            : ticket
        )
      );
    }
    if (existingTicket && existingTicket.quantity === 1) {
      setShoppingCartTickets(
        shoppingCartTickets.filter(ticket => ticket !== existingTicket)
      );
    }
  }

  //Remove all tickets of type to cart (from Cart)
  function removeTicketsFromCart(eventName, ticketType) {
    setShoppingCartTickets(
      shoppingCartTickets.filter(
        ticket =>
          ticket.eventName !== eventName || ticket.ticketType !== ticketType
      )
    );
  }

  function getTotalPrice() {
    return shoppingCartTickets.reduce((sum, ticket) => {
      return sum + ticket.price * ticket.quantity;
    }, 0);
  }

  function clearShoppingCart() {
    setShoppingCartTickets([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartTickets,
        addOneToCart,
        removeOneFromCart,
        removeTicketsFromCart,
        addToCart,
        getTotalPrice,
        clearShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
