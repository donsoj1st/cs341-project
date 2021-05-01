const user = ["mercy", "mercy", "kunle", "ade", "tunde"];
const handler = (req, res) => {
   
    const url = req.url;
    const method = req.method
    let check = false;
    
    if (url === '/') {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write(`<body>
        <p>Welcome to my first project</P>
        <form action = "/create-user" method = "POST" >
        <input type = "text" name = "message"><button type = "submit">submit</button></form>>
        </body>`)
        res.write('</html>')
        return res.end();
    }

        

    
    if (url === "/create-user" && method == "POST") {
        const body = []
        req.on("data", (chunks) => {
            body.push(chunks)

        })
        return req.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split("=")[1];
            console.log(message);
            user.push(message)
            
            console.log(user)
            res.statusCode = 302;
            res.setHeader("Location", '/users');
            res.end();
            

        })

        


    }
    if (url === "/users") {
        let list = `<p>`;
        for (let i = 0; i < user.length; i++) {
            list += `user : ${user[i]} <br>`;
            console.log(user[i])

        }
        list += `</p>`;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write(`${list}`);
        res.write('</body >');
        res.write('</html>')
        return res.end();

    }

    
    
}
module.exports = handler;