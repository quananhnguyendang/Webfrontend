const express = require('express');
//console.log("Start");
const app = express();
//app.use(cors(corsOptions));

const cors = require('cors')
const bodyParser = require('body-parser');


var corsOptions = {
    origin: 'http://localhost:4200',
    //domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
    //giả sử node server là http://localhost:8000
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.listen(8000, () => {
    console.log('Server started!');
});
app.use(cors(corsOptions));
app.use(bodyParser.json()); 


app.route('/api/items').get((req, res) => {
    console.log('items');
      res.send([{ id:'id1', manufacturer: 'Honda', name: 'Civic', price:'1000000', type:'car' }, { id:'id2', manufacturer: 'Huyndai', name: 'Accent', price:'2000000', type:'car' }]
      );
  });

  app.route('/api/insert').post((req, res) => {
		 
    console.log('insert account');
    console.log('account info:'+req.body);
      res.send(201, req.body);
    });

    app.route('/api/login').get((req, res) => {
		 
      console.log('Login account');
      console.log('account info:'+req.body);
        res.send(201, req.body);
      });