require("dotenv").config();

//* Tools
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const initializePassport = require("./routes/passport-config");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const { User, Note, Card } = require("./models");
const mustacheExpress = require("mustache-express");
const { response } = require("express");

const PORT = 3033;
const VIEWS_PATH = path.join(__dirname, "../views");

//* Middleware
// comment
app.use(cors());
app.use(express.json());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.engine("mustache", mustacheExpress(VIEWS_PATH + ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use(express.static("../public"));
app.use(express.static("../assets"));

app.use(express.urlencoded({ extended: false }));

// CUSTOM MIDDLEWARE
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function checkIfUserIsLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}

	next();
}

app.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("home-page", {
			button: "Logout",
			route: "/logout",
      type: "hidden"
		});
	} else {
		res.render("home-page", {
			button: "Login",
			route: "/login",
      type: "submit"
		});
	}
});

app.get("/login", checkIfUserIsLoggedIn, (req, res) => {
	res.render("login");
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	}),
	function (req, res) {
		res.json();
	}
);

app.get("/register", checkIfUserIsLoggedIn, (req, res) => {
	res.render("register");
});

app.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const Password = await bcrypt.hash(req.body.Password, salt);
		const { UserName, FirstName, LastName, DOB, Address, Email } = req.body;
		const newUser = await User.create({
			UserName,
			Password,
			FirstName,
			LastName,
			DOB,
			Address,
			Email,
		});

		res.status(200).redirect("/login");
	} catch (error) {
		res.status(401).redirect("/register");
	}
});

app.get("/logout", (req, res) => {
	req.logOut();
	res.redirect("/login");
});

app.get("/note", checkAuthenticated,(req, res) => {
	res.render("notes-page", { userid: req.user });
});

app.post("/note", async (req, res) => {
	const { Title, Text, UserId } = req.body;
  const newNote = await Note.create({
    Title,
    Text,
    UserId,
  });

  res.render("notes-page");
});

app.get("/view_notes", checkAuthenticated, async (req, res) => {
	try {
		const data = await Note.findAll({ where: { UserId: req.user } });

		res.render("notes-page", { Notes: data });
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/read_note/:id", async (req,res) => {
  const { id } = req.params;
  const data = await Note.findOne({
    where: {
      id: id
    }
  });


  res.render("read-note", { Notes: data });
});

app.get("/edit_note/:id", async (req,res) => {
  const { id } = req.params;
  const data = await Note.findOne({
    where: {
      id: id
    }
  });

  res.render("edit-note", { Notes: data })
})

app.post("/edit_note/:id", async (req,res) => {
  const { id } = req.params;

  await Note.update(req.body, {
    where: {
      id
    }
  })

  res.redirect("/note")
})

app.post("/delete_note/:id", async (req,res) => {
  const { id } = req.params;

  await Note.destroy({
    where: {
      id
    }
  })

  res.redirect("/note")
})

app.get("/card/:id", checkAuthenticated, async (req,res) => {
  const { id } = req.params

  const data = await Card.findAll({ where: { NoteId: id } });


  res.render("cards-page", { 
    noteid: id,
    Cards: data
  })
});

app.put("/card/:id", checkAuthenticated, async (req,res) => {
  const { id } = req.params

  const data = await Card.findAll({ where: { NoteId: id } });

  res.json(data)
})



app.post("/card/:id", checkAuthenticated, async (req, res) => {
	const { Question, Answer, NoteId } = req.body;
	const newCard = await Card.create({
		Question,
		Answer,
    NoteId
	});

  res.redirect(`/card/${NoteId}`)
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
