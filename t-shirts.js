const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: '/images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: '/images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: '/images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: '/images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: '/images/grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: '/images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: '/images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: '/images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: '/images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

const root = ReactDOM.createRoot(document.getElementById('root'));

const QuantitySelector = ({ stock, getBuy }) => {
  const [buy, setBuy] = React.useState(1);

  //take the value of the nunber of stock that the user wants to buy
  const handleChange = (e) => {
    setBuy(parseInt(e.target.value));
  };

  //render the options for the select element based on the stock available
  const renderOptions = () => {
    const options = [];
    for (let i = 1; i <= stock; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  //handle the button click to get the number of items to buy
  const buttonHandler = (e) => {
    e.preventDefault();
    getBuy(buy); //call the function to update the stock, this function is in the parent component.
  }

  //return select, options and button.
  return (
    <div>
      <select value={buy} onChange={handleChange}>
        {renderOptions()}
      </select>
      <button className="button" onClick={buttonHandler}>Buy</button>
    </div>
  );
};

//main component that exports data.
const Tshirts = ({ data }) => {
  //using another const to destructure the data and for the purpose of updating the stock
  const [tshirtsList, setTshirtsList] = React.useState(data);

  //decrease the stock after the click
  const countBuy = (index, amount) => {
    setTshirtsList(prevList => {
      const updated = [...prevList];
      updated[index].stock -= amount;
      return updated;
    }
    )
  }

  //function that shows the stock available or out of stock
  const remainingStock = (stock, index) => {
  if (stock > 0) {
    return (<div>
    <p>In Stock: {stock}</p>
    <QuantitySelector stock={stock} getBuy={(amount) => countBuy(index, amount)}/></div>
  )
  } else {
    return (<p className="out-of-stock">Out of Stock</p>)
  }
}

  //render the tshirts list
  return (
    <div className="tshirt-collection">
      {tshirtsList.map((tshirt, index) => (
        <div key={index} className="tshirt">
          <img src={tshirt.image} alt={tshirt.title} />
          <h2>{tshirt.title}</h2>
          <div className="tshirt-info">
          <p>Price: ${tshirt.price}</p>
          {remainingStock(tshirt.stock, index)}
          </div>
        </div>
      ))}
    </div>
  );
}

const App = () => {
  
  return (
    <div>
      <h1>T-Shirts</h1>
      <Tshirts data={tshirts} />
    </div>
  );
}


root.render(<App />);