const bcrypt  = require('bcrypt')

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ], 
  
  
  products: [
      {
        
        name: 'Wajahat Photogreaphiee',
        category: 'Shirts',
        image: '/images/pic1.jpeg',
        creator:'5fe5bce6b82d2316e45bc054',
        price: 120,
        brand: 'Nike',
        countInStock:10,
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
        creator:'5fcf60ce4756e813f0f84e57'
      },
      // {
        
      //   name: 'Adidas Fit Shirt',
      //   category: 'Shirts',
      //   image: '/images/pic12.jpeg',
      //   creator:'5fe5bce6b82d2316e45bc054',
      //   price: 100,
      //   brand: 'Adidas',
      //   countInStock:11,
      //   rating: 4.0,
      //   numReviews: 10,
      //   description: 'high quality product',
      // },
      // {
        
      //   name: 'Lacoste Free Shirt',
      //   category: 'Shirts',
      //   image: '/images/pic66.jpeg',
      //   creator:'5fe5bce6b82d2316e45bc054',
      //   price: 220,
      //   brand: 'Lacoste',
      //   countInStock: 0,
      //   rating: 4.8,
      //   numReviews: 17,
      //   description: 'high quality product',
      // },
      // {
        
      //   name: 'Nike Slim Pant',
      //   category: 'Pants',
      //   image: '/images/pic14.jpeg',
      //   creator:'5fe5bce6b82d2316e45bc054',
      //   price: 78,
      //   brand: 'Nike',
      //   countInStock:10,
      //   rating: 4.5,
      //   numReviews: 14,
      //   description: 'high quality product',
      // },
      // {
        
      //   name: 'Puma Slim Pant',
      //   category: 'Pants',
      //   image: '/images/pic15.jpeg',
      //   creator:'5fe5bce6b82d2316e45bc054',
      //   price: 65,
      //   brand: 'Puma',
      //   countInStock:10,
      //   rating: 4.5,
      //   numReviews: 10,
      //   description: 'high quality product',
      // },
      {
        
        name: 'Adidas Fiett Pant',
        category: 'Pants',
        image: '/images/11.jpeg',
        creator:'5fe5bce6b82d2316e45bc054',
        price: 139,
        brand: 'Adidas',
        countInStock:10,
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
        creator:'5fcf60ce4756e813f0f84e57'
      },
    ],
  };
 module.exports=data;