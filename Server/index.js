const mongoose = require('mongoose');
const express = require('express');
const user_auth_route =  require('./routes/User_Auth_TB_Router');
const user_type_route =  require('./routes/User_Type_TB_Router');
const user_detail_route =  require('./routes/User_Detail_TB_Router');
const user_donation_type_route =  require('./routes/Donation_Type_TB_Router');
const info_route =  require('./routes/info_router');
const order_route =  require('./routes/Order_TB_Router');
const app = express();


mongoose.connect('mongodb://localhost/mongo-ngo-donation')
    .then(()=>console.log('You are now connected to MongoDB!'))
    .catch((err)=>console.log('Something went wrong',err));


app.use('/api/ngo/donationtype',user_donation_type_route);
app.use('/api/ngo/order',order_route);
app.use('/api/ngo/info',info_route);


//* Route for user_auth models *//
app.use('/api/ngo/user',user_auth_route);

//* Route for user_type models *//
app.use('/api/ngo/usertype',user_type_route);

//* Route for user_type models *//
app.use('/api/ngo/userdetail',user_detail_route);

//* Default route *//
app.get('/',(req,res) => {
    res.send(`<div style="text-align: center; margin-top: 100px; color: magenta">
    <h1>Welcome to NGO-DONATION REST api webservice</h1>
    </div>`);
});
app.get('/api/ngo',(req,res) => {
    res.send(`<div style="text-align: center; margin-top: 100px; color: cyan">
    <h1>Welcome to NGO-DONATION REST api webservice</h1>
    </div>`);
});

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
