/* import getConfig from 'next/config';
const mongoose = require('mongoose');

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Client: clientModel(),
    Cita: citaModel()  
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });
     return mongoose.models?.User || mongoose.model('User', schema); 
}

function clientModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        cita: { type: Date, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models?.Client || mongoose.model('Client', schema);
} 

 function citaModel() {
    const schema = new Schema({
        clientId: { type: Schema.Types.ObjectId, ref: 'Client' }, // ID del cliente asociado
        cita: { type: Date, required: true }
      }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
      });
  
    schema.set('toJSON', {
      virtuals: true,
      versionKey: false,
    });
  
    return mongoose.models?.Cita || mongoose.model('Cita', schema);
}  */
/* import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

import mongoose from "mongoose";

console.log(process.env.MONGO_URI)
console.log(serverRuntimeConfig.connectionString)
    // Conexión a la base de datos
    mongoose.connect(process.env.MONGO_URI || serverRuntimeConfig.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }); */

      const getConfig = require('next/config').default;
      const mongoose = require('mongoose');
      
      const { serverRuntimeConfig } = getConfig();
      
      // Conexión a la base de datos
      mongoose.connect(process.env.MONGO_URI || serverRuntimeConfig.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      const db = mongoose.connection;
      
      db.on('error', (error) => {
        console.error('Error de conexión a la base de datos:', error);
      });
      
      db.once('connected', () => {
        console.log('Conexión exitosa a la base de datos');
      
        const Schema = mongoose.Schema;
      
        // Definición de los esquemas de los modelos
        const userSchema = new Schema({
          // ...
        });
      
        // ...
      
        // Definición de los modelos
        const User = mongoose.models.User || mongoose.model('User', userSchema);
        const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);
        const Cita = mongoose.models.Cita || mongoose.model('Cita', citaSchema);
      
        // Exportación de los modelos
        module.exports = {
            User,
            Client,
            Cita,
          };
      });







