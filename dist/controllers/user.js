"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
//Extrae el nombre de usuario y la contraseña de la solicitud, 
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validamos si el usuario ya existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        res.status(400).json({
            msg: `ya existe un usuario con el nombre ${username}`
        });
    }
    else {
        //cifra la contraseña con bcrypt
        //crea un nuevo usuario en la base de datos. En caso de error, devuelve una respuesta JSON 
        //con un código de estado 400 y un mensaje de error.
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            yield user_1.User.create({
                username: username,
                password: hashedPassword
            });
            res.json({
                msg: `Usuario ${username} creado exitosamente!`
            });
        }
        catch (error) {
            res.status(400).json({
                msg: 'Upps ocurrió un error', error
            });
        }
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: "Login user",
        body
    });
};
exports.loginUser = loginUser;
