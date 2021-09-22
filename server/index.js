

const express = require('express');
const { get } = require('http');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors());
//app.use(express.json)
app.use(bodyParser.urlencoded({ extended: true }))

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./database/Salome.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});


var empeados = [];
var serviciossimple = [];
var users = [];

db.serialize(() => {
    db.all(`select * from Serviciosimple `, (err, ress) => {
        if (err) {
            console.error(err.message);
        }
        serviciossimple = ress;
    });
});
db.serialize(() => {
    db.all(`select * from Empleado`, (err, ress) => {
        if (err) {
            console.error(err.message);
        }
        empeados = ress;
    });
});

db.serialize(() => {
    db.all(`select * from Usuario`, (err, ress) => {
        if (err) {
            console.error(err.message);
        }
        users = ress;
    });
});



app.get("/sql/GetUsers", (req, res) => {

    db.serialize(() => {
        db.all(`select * from Usuario `, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            res.send(ress)
        });
    });
})


app.get("/sql/GetEmploys", (req, res) => {

    db.serialize(() => {
        db.all(`select * from Empleado`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            res.send(ress)
        });
    });
})




app.get("/sql/GetServices", (req, res) => {

    db.serialize(() => {
        db.all(`select * from Servicio where id_usuario = ${req.query.userid}`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }

            ress.forEach(servicio => {
                empeados.forEach(element => {
                    if (element.id_empleado == servicio.id_empleado) {
                        servicio.id_empleado = element.nombre_empleado + ' ' + element.apellido_empleado
                    }
                });
                serviciossimple.forEach(element => {
                    if (element.id_serviciosimple == servicio.id_serviciosimple) {
                        servicio.id_serviciosimple = element.nombre;
                    }
                });
                users.forEach(element => {
                    if (element.id_usuario == servicio.id_usuario) {
                        servicio.id_usuario = element.nombre + ' ' + element.apellido;
                    }
                });

            });
            res.send(ress)
        });
    });


})


app.get("/sql/GetServicesById", (req, res) => {

    db.serialize(() => {
        console.log(req.query.id_formulario);
        db.all(`select * from Servicio where id_serviciosimple = ${req.query.id_formulario}`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            if (ress) {
                ress.forEach(servicio => {
                    empeados.forEach(element => {
                        if (element.id_empleado == servicio.id_empleado) {
                            servicio.id_empleado = element.nombre_empleado + ' ' + element.apellido_empleado
                        }
                    });
                    serviciossimple.forEach(element => {
                        if (element.id_serviciosimple == servicio.id_serviciosimple) {
                            servicio.id_serviciosimple = element.nombre;
                        }
                    });
                    users.forEach(element => {
                        if (element.id_usuario == servicio.id_usuario) {
                            servicio.id_usuario = element.nombre + ' ' + element.apellido;
                        }
                    });

                });
            }

            res.send(ress)
        });
    });


})


app.get("/sql/GetServicesByEmploy", (req, res) => {

    db.serialize(() => {

        db.all(`select * from Servicio where id_empleado = ${req.query.id_empleado}`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            if (ress) {
                ress.forEach(servicio => {
                    empeados.forEach(element => {
                        if (element.id_empleado == servicio.id_empleado) {
                            servicio.id_empleado = element.nombre_empleado + ' ' + element.apellido_empleado
                        }
                    });
                    serviciossimple.forEach(element => {
                        if (element.id_serviciosimple == servicio.id_serviciosimple) {
                            servicio.id_serviciosimple = element.nombre;
                        }
                    });
                    users.forEach(element => {
                        if (element.id_usuario == servicio.id_usuario) {
                            servicio.id_usuario = element.nombre + ' ' + element.apellido;
                        }
                    });

                });
            }

            res.send(ress)
        });
    });


})



app.get("/sql/GetSimpleServices", (req, res) => {

    db.serialize(() => {
        db.all(`select * from Serviciosimple`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            console.log(ress);
            res.send(ress)
        });
    });
})



app.post("/sql/updateQulityObservation", (req, res) => {

    db.serialize(() => {
        db.exec(`UPDATE Servicio SET calidad_servicio = ${parseInt(req.query.calidad_servicio)}, observacion= '${req.query.observacion}' WHERE id_formulario = ${parseInt(req.query.id_formulario)}`, (err, ress) => {
            if (err) {
                console.error(err.message);
            }
            res.send(ress)
        });
    });
})



app.listen(3001, () => {
    console.log("Running services on 3001");

})