const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
app.use(express.json());

app.post('/createFile', (req, res)=>{
    const folderpath = '\API-Folder';
    // const folderpath = path.join(__dirname, 'API-Folder');
    const filename = `${new Date().toISOString().replace(/[-:.]/g, '')}.txt`;
    // const filename = `${new Date().toISOString()}.txt`;

    const filepath = `${folderpath}/${filename}`;
    // const content = new Date().toString();
    // const content = req.body && req.body.content ? req.body.content : new Date().toString();
    const content = `${req.body.content} \n ${new Date().toString()}`;

    fs.writeFile(filepath, content, (err)=>{
        if(err){
            res.status(500).send(err.message);
        }
        else{
            res.send(`File ${filename} created successfully`);
        }

    }
    )
})

app.get('/getTextFile', (req, res)=>{
    const folderpath = '\API-Folder';
    fs.readdir(folderpath, (err, files)=>{
        if(err){
            res.status(500).send(err.message);
        }
        else{
            const textfile = files.filter(file => file.endsWith(".txt"));
            res.json(textfile);
        }
    })
})


// app.get('/', function (req, res) {
//   res.send('Hello World hi')
// })

app.listen(port, ()=>{console.log(`Server listening on port ${port}`)})