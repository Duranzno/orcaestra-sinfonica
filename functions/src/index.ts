import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

//Hacer funcion para enviar tokenId a db/suscripciones/

function payloadGenerator(grupo: string, titulo: string, obraId: string) {
  return ({
    notification: {
      title: `Nueva Partitura del grupo ${(JSON.stringify(grupo))}!`,
      body: `${JSON.stringify(titulo)} esta disponible en el grupo ${JSON.stringify(grupo)}`,
      icon: `https://goo.gl/Fz9nrQ` + obraId
    }
  });
}
async function userNotificator(userId: string, titulo: string, obraId: string, grupo: string): Promise<any> {
  try {
    const snap = await db.collection(`usuarios`).doc(userId).get();
    const u: any = await snap.data;
    const tokens = u.fcmTokens ? Object.keys(u.fcmTokens) : [];
    if (!tokens.length) { throw new Error(`Usuario no tiene tokens!`); }
    return { ...payloadGenerator(grupo, titulo, obraId), ...tokens };
    // return admin.messaging().sendToDevice(tokens, payloadGenerator(grupo, titulo, obraId));

  } catch (error) {
    console.error(error);
  }
}
async function groupNotificator(grupo: string, titulo: string, obraId: string): Promise<any> {
  try {
    const snapshot = await db.collection(`subscripciones`).doc(grupo).get();
    const g: any = await snapshot.data();
    if (typeof g === undefined) {
      return new Error(`El grupo no existe en la db`);
    }

    console.log(`El dentro de subscripciones\\${JSON.stringify(grupo)} es ${JSON.stringify(g)}`);

    if (typeof g.subscripciones === undefined) {
      console.log(`El grupo no tiene subscripciones`);
      return `El grupo no tiene subscripciones`;
    }
    console.log(`Las subscripciones de ${JSON.stringify(grupo)} son ${JSON.stringify(g.suscriptores)}`);
    console.log(`Voy a tratar de usar userNotificator ${(titulo) ? titulo : 'error en titulo'} ${(obraId) ? obraId : 'error en obraId'} ${(grupo) ? grupo : 'error en grupo'}`);
    (g.suscriptores as string[]).forEach(userId => { console.log('userId'); });
    return userNotificator('8uSyP89aa5a3w5AJ2jw8Xc2kvAG2', titulo, obraId, grupo);
  } catch (e) {
    console.error(`Error en db/subscripciones ${JSON.stringify(e)}`);
    return (`Error en db/subscripciones ${JSON.stringify(e)}`);
  }
}
export const notifyUser = functions.firestore
  .document(`partituras/{partiturasId}`)
  .onCreate(async (event, ctx) => {
    console.log(`i started notify user`);
    const id = ctx.params[`partiturasId`], score: any = event.data();
    console.log(score);
    const grupos: string[] = score.grupos;
    if (grupos) {
      console.log(`Ya se obtuvieron los grupos ${JSON.stringify(grupos)} de ${JSON.stringify(score.obra)}`);
      const notifications: Promise<any>[] = grupos.map(
        g => groupNotificator(g, score.obra, id));
      return Promise.all(notifications);
    } else {
      console.log(`La partitura ${JSON.stringify(id)} no tiene grupos`, score);
      return `La partitura no tiene grupo`;
    }
  });
