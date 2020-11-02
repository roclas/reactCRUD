#!/usr/bin/env node

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

//configurations:
const port=4001;

const rand=max=>Math.floor(Math.random() * Math.floor(max));
const randarr=arr=>arr[rand(arr.length)];
const colors=["red","blue","pink","yellow","purple","orange","black","indigo","brown","white"];
const brands=["Peugeot","Giant","BH","Orbea","Acme","Unknown"];
const items=[...Array(100).keys()].reduce((a,i)=>{
	a[i]={"name":"bicycle "+i,
		color:randarr(colors),
		brand:randarr(brands),
		extraField:randarr(colors.concat(brands)),
		year:2000+rand(20),"id":i}
	return a;
	} ,{}
);
 
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});

app.get('/', (req, res) => {
  res.status(200).json({"how it works":"list,edit,delete or create items",});
  res.end();
});

app.get('/items/:id', (req, res) => {
  let { id } = req.params;
  console.log("body and params",req.body,req.params);
  res.status(200).json(items[id]);
  res.end();
});

app.get('/items', (req, res) => {
  res.status(200).json(items);
  res.end();
});

app.put('/items/:id', (req, res) => {
  let { id } = req.params;
  console.log("body and params",req.body,req.params);
  items[id]={...items[id],...req.body,id:id};
  res.status(200).json({"result":"OK"});
  res.end();
});

app.post('/items', (req, res) => {
  let uid=uniqid();
  items[uid]={...req.body,id:uid};
  res.status(200).json({"result":"OK",id:uid});
  res.end();
});

app.delete('/items/:id', (req, res) => {
  let { id } = req.params;
  delete items[id];
  res.status(200).json({"result":"OK"});
  res.end();
});

 
app.listen(port, () =>
  console.log(`Our backEnd services are runing on port ${port}!`),
);
