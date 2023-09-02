const express = require('express');
const app = express();

app.get('/', (req,res)=>{ res.send('this is working')});



app.listen(3500, console.log('working on server 3500'));