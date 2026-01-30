const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();
const cors = require('cors');
const crypto = require('crypto');
const e = require('express');
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/pfp"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `user_${req.user.userId}.${ext}`); // Save uniquely by user ID
  },
});
const upload = multer({ storage });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.query('SELECT 1', (err, results) => {
    if (err) console.error('Error running query:', err);
    else console.log('Database is working');
});

const store = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use(session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "docs")));





////////////////////////// REUSABLE FUNCTIONS //////////////////////////
async function sendApplication(name, email, phone, business, link){
    let emailText = `
        Hi, a new user applied for Club729.<br><br>

        Name: ${name}<br><br>

        Email: ${email}<br><br>

        Phone: ${phone}<br><br>

        Business Industry: ${business}<br><br>

        Visit this link to accept their application: ${link}
    `;
    const dataToSend = { reciever: process.env.club_ADMIN_EMAIL, text: emailText, service: 'nextdesign' };
    try {
        const response = await fetch('https://email-sender-lkex.vercel.app/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dataToSend), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            return;
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}
async function sendAcception(userEmail){
    let emailText = `
        Hi, your application for Club729 has been accepted.<br><br>

        You can now login as a member: ${process.env.club_FRONTEND}/?login=true
    `;
    const dataToSend = { reciever: userEmail, text: emailText, service: 'nextdesign' };
    try {
        const response = await fetch('https://email-sender-lkex.vercel.app/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dataToSend), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            return;
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
function getCurrentDate() {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}
function getTime(){
    const now = new Date();
    let timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    if(Number(timeString.slice(0, 2)) >= 12){
        timeString = String(Number(Number(timeString.slice(0, 2)) - 12)) + timeString.slice(2) + "pm";
    } else if(Number(timeString.slice(0, 2)) >= 10){
        timeString = timeString.slice(0) + "am";
    } else {
        timeString = timeString.slice(1) + "am";
    }
    return timeString;
}
function requireAdmin(req, res, next){
    if(req.user.admin){
        next();
    } else {
        console.log("UNAUTH");
        return res.json({ message: 'unauth' });
    }
}
function clubRequireAuth(req, res, next) {
    const header = req.headers.authorization;

    if (!header){
        console.log("unauth");
        return res.json({ message: 'unauth' });
    } 
        

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        console.log("unauth 2");
        return res.json({ message: 'unauth' });
    }
}



////////////////////////// APIS ROUTES //////////////////////////
app.post("/api/apply", (req, res) => {
    const { name, email, phone, password, business, businesstyped } = req.body;

    console.log(business);

    let businessStr = business;
    if(businessStr == "other") businessStr = businesstyped;
    if(businessStr == ""){
        return res.json({ message: 'noother' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if(err){
            console.error(err);
        }

        const token = Math.floor(100000 + Math.random() * 900000);

        db.query("insert into users (name, email, phone, password_hash, business, token) values (?, ?, ?, ?, ?, ?)", [name, email, phone, hashedPassword, businessStr, token], (err, result) => {
            if(err){
                console.error(err);
            }

            let link = process.env.club_FRONTEND + `/?token=${token}`;
            sendApplication(name, email, phone, business, link);
            return res.json({ message: 'success' });
        });
    });
});

app.post("/api/verify-user", (req, res) => {
    const token = req.body.token;

    db.query("select * from users where token = ?", [token], (err, result) => {
        if(err){
            console.error(err);
        } 

        if(result.length == 0){
            return res.json({ message: 'nouser' });
        }

        let userId = result[0].id;
        let userEmail = result[0].email;
        let userName = result[0].name;
        db.query("select * from users where perms = ?", ["admin"], (err, result) => {
            if(err){
                console.error(err);
            }

            let newPerms = "user";
            if(result.length == 0){
                newPerms = "admin";
            }

            db.query("update users set token = ?, accepted = ?, perms = ? where id = ?", ["n/a", "yes", newPerms, userId], (err, result) => {
                if(err){
                    console.error(err);
                }
    
                sendAcception(userEmail);
                return res.json({ message: 'success', name: userName });
            });
        });
    });
});

app.post("/api/login", (req, res) => {
    const { name, email, password } = req.body;


    db.query("select * from users where email = ?", [email], (err, result) => {
        if(err){
            console.error(err);
        }

        if(result.length == 0 || result[0].accepted == "no"){
            return res.json({ message: 'nouser' });
        }

        bcrypt.compare(password, result[0].password_hash, (err, isMatch) => {
            if(err){
                console.error(err);
            }

            if(!isMatch){
                return res.json({ message: 'invalidpassword' });
            }

            let isAdmin = false;
            if(result[0].perms == "admin") isAdmin = true;

            const payload = {
                userId: result[0].id,
                name: result[0].name,
                admin: isAdmin,
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: "60m" }
            );
            return res.json({ message: 'success', token: token });
        });
    });
});

app.get("/api/get-user", clubRequireAuth, (req, res) => {
    db.query("select * from users where id = ?", [req.user.userId], (err, result) => {
        if(err){
            console.error(err);
        }

        if(result.length == 0){
            return res.json({ message: 'nouser' });
        }
        
        let userData = result[0];
        userData.password_hash = "";
        return res.json({ message: 'success', userData: userData });
    });
});

app.post("/api/get-events", (req, res) => {
    let likeStr;
    if(req.body.month < 10){
        likeStr = "%" + req.body.year + "-0" + String(req.body.month) + "%";
    } else {
        likeStr = "%" + req.body.year + "-" + String(req.body.month) + "%";
    }

    const getBookingsQuery = "select * from all_events where event_date like ?";
    db.query(getBookingsQuery, [likeStr], (err, result) => {
        if(err){
            console.error("Error getting bookings: " + err);
            return res.json({ bookings: [] });
        }

        return res.json({ bookings: result });
    });
});

app.get("/api/get-all", (req, res) => {
    db.query("select * from users", (err, result) => {
        let users = result;
        users.forEach(user => user.password_hash == "");
        return res.json({ users: users });
    });
});

app.get("/api/get-chats", clubRequireAuth, (req, res) => {
    db.query("select * from chats order by id asc", (err, result) => {
        if(err){
            console.error(err);
        }

        let chats = result;
        return res.json({ message: 'success', chats: chats });
    });
});

app.post("/api/send-chat", clubRequireAuth, (req, res) => {
    const message = req.body.message;
    const area = req.body.area;

    db.query("insert into chats (user_id, message, full_date, full_time, area) values (?, ?, ?, ?, ?)", [req.user.userId, message, getCurrentDate(), getTime(), area], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.get("/api/get-announcements", clubRequireAuth, (req, res) => {
    db.query("select * from announcements order by id desc", (err, result) => {
        if(err){
            console.error(err);
        }

        const ancs = result;
        db.query("select * from users where id = ?", [req.user.userId], (err, result) => {
            if(err){
                console.error(err);
            }

            const userData = result[0];
            userData.password_hash = "";
            return res.json({ message: 'success', announcements: ancs, userData: userData });
        });
    });
});

app.post("/api/post-announcement", clubRequireAuth, requireAdmin, (req, res) => {
    const { heading, message } = req.body;

    db.query("insert into announcements (user_id, full_date, head, para) values (?, ?, ?, ?)", [req.user.userId, getCurrentDate(), heading, message], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    })
});

app.post("/api/create-event", clubRequireAuth, requireAdmin, (req, res) => {
    let { title, description, date, time, where, link } = req.body;

    if(date.length != 10 || isNaN(date.slice(0, 2)) || isNaN(date.slice(3, 5)) || isNaN(date.slice(6)) || date[2] != "/" || date[5] != "/"){
        return res.json({ message: 'invaliddate' });
    }

    date = `${date.slice(-4)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
    db.query("insert into all_events (title, event_date, event_description, event_time, event_where, event_link) values (?, ?, ?, ?, ?, ?)", [title, date, description, time, where, link], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.post("/api/edit-event", clubRequireAuth, requireAdmin, (req, res) => {
    let { title, description, date, time, where, link, id } = req.body;

    if(date.length != 10 || isNaN(date.slice(0, 2)) || isNaN(date.slice(3, 5)) || isNaN(date.slice(6)) || date[2] != "/" || date[5] != "/"){
        return res.json({ message: 'invaliddate' });
    }

    date = `${date.slice(-4)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
    db.query("update all_events set title = ?, event_date = ?, event_description = ?, event_time = ?, event_where = ?, event_link = ? where id = ?", [title, date, description, time, where, link, id], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.get("/api/get-members", clubRequireAuth, requireAdmin, (req, res) => {
    db.query("select * from users where accepted = ? and perms = ? order by name asc", ["yes", "user"], (err, result) => {
        if(err){
            console.error(err);
        }

        let userData = result;
        userData.forEach(user => {
            user.password_hash = "";
        });
        return res.json({ message: 'success', members: userData });
    });
});

app.post("/api/delete-user", clubRequireAuth, requireAdmin, (req, res) => {
    db.query("delete from users where id = ?", [req.body.id], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.post("/api/delete-event", clubRequireAuth, requireAdmin, (req, res) => {
    db.query("delete from all_events where id = ?", [req.body.id], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.get("/api/get-applications", clubRequireAuth, requireAdmin, (req, res) => {
    db.query("select  * from users where accepted = ?", ["no"], (err, result) => {
        if(err){
            console.error(err);
        }

        let userData = result;
        userData.forEach(member => {
            member.password_hash = "";
        });
        return res.json({ message: 'success', members: userData });
    });
});

app.post("/api/accept-member", clubRequireAuth, requireAdmin, (req, res) => {
    const userId = req.body.id;

    db.query("update users set accepted = ? where id = ?", ["yes", userId], (err, result) => {
        if(err){
            console.error(err);
        }

        sendAcception(req.body.email);
        return res.json({ message: 'success' });
    });
});

app.post("/api/upload-pfp", clubRequireAuth, upload.single("pfp"), (req, res) => {
    db.query("update users set pfp = ? where id = ?", [`/uploads/pfp/${req.file.filename}`, req.user.userId], (err, result) => {
        if(err){
            console.error(err);
        }

        res.json({ success: true, url: `/uploads/pfp/${req.file.filename}` });
    });
});

app.get("/api/delete-pfp", clubRequireAuth, (req, res) => {
    db.query("update users set pfp = ? where id = ?", ["/images/pfp_base.png", req.user.userId], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.post("/api/edit-profile", clubRequireAuth, (req, res) => {
    const { name, email, phone, business } = req.body;

    db.query("update users set name = ?, email = ?, phone = ?, business = ? where id = ?", [name, email, phone, business, req.user.userId], (err, result) => {
        if(err){
            console.error(err);
        }

        return res.json({ message: 'success' });
    });
});

app.use("/uploads", express.static("uploads"));

// create, edit, apply, chats




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});