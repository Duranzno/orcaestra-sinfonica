import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
admin.initializeApp();

// Esta funcion se va a activar para generar notificar al usuario que una nueva partitura de un mismo genero se cargo
export const nuevaPartituraDelMismoGrupo = functions.firestore
  .document('partituras/{partiturasId}')
  .onCreate(async (snap, ctx) => {
    const data = snap.data();
    console.log((data) ? data.generos : '')
  })
//Actualizar coleccion suscripciones con nuevo suscriptor
// export const nuevoSuscriptor = functions.https.onRequest(async (req, res) => {
  // admin.
  // await admin.firestore().doc('/subscripciones').getCollections()
  // const subscripciones = [{
  //   'genero': 'clasica',
  //   'suscriptores': ['uid_de_admin', 'uid_de_usuario'],
  // }
  // ];
  // return subscripciones;
  // return suscripciones.flatap(subs=>subs.suscriptores).forEach()
// })
export const pdf = functions.https.onRequest(async (req, res) => {
  return ""
})
