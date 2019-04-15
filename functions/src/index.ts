
import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

// NotificacionesGrupos() will listen to any score uploaded and  check its musical groups if any of them have suscribers(users)=>groupParser
// then it will use the ids of those suscribers to send them notification through the users fcmToken =>userNotificator
export const NotificacionesGrupos = functions.firestore
  .document(`partituras/{partiturasId}`)
  .onCreate(async (event, ctx) => {
    const id = ctx.params[`partiturasId`], score: any = event.data(), grupos: string[] = score.grupos;

    if (grupos) {
      console.log(`[LOG] Se obtuvieron los grupos ${JSON.stringify(grupos)} de ${JSON.stringify(score.obra)}`);

      const notifications: Promise<any>[] = grupos.map(g => groupMapper(g, score.obra, id));
      return Promise.all(notifications);
    } else {
      console.log(`[ERROR] La partitura ${JSON.stringify(id)} no tiene grupos`, score);
      return `La partitura no tiene grupo`;
    }
  });
async function groupMapper(grupo: string, titulo: string, obraId: string): Promise<any> {
  try {
    const snap = await db.collection(`usuarios`).where('grupo', '==', grupo).get();
    snap.forEach(doc => {
      const u = doc.data();
      console.log(`El grupo ${u.grupo} tiene a ${u.nombre} con ${JSON.stringify(u.fcmTokens)}`);
      const payload = payloadGenerator(grupo, titulo, obraId);
      const tokens = u.fcmTokens ? Object.keys(u.fcmTokens) : [];
      if (!tokens.length) { throw new Error(`Usuario no tiene tokens!`); }
      return admin.messaging().sendToDevice(tokens, payload);
    });
  } catch (e) {
    console.error(`Error en db/subscripciones ${JSON.stringify(e)}`);
    return (`Error en db/subscripciones ${JSON.stringify(e)}`);
  }
}
// async function userNotificator(userId: string, titulo: string, obraId: string, grupo: string): Promise<any> {
//   try {
//     const snap = await db.collection(`usuarios`).doc(userId).get();
//     const u: any = await snap.data();
//     console.log(`[LOG] Usuario `, u);

//     const payload = payloadGenerator(grupo, titulo, obraId);
//     console.log('[LOG] Payload', payload);

//     const tokens = u.fcmTokens ? Object.keys(u.fcmTokens) : [];
//     if (!tokens.length) { throw new Error(`Usuario no tiene tokens!`); }

//     // return payload;
//     return admin.messaging().sendToDevice(tokens, payload);

//   } catch (error) {
//     console.log('[ERROR]', error);
//   }
// }
function payloadGenerator(grupo: string, titulo: string, obraId: string) {
  return ({
    notification: {
      title: `Nueva Partitura del grupo ${(grupo)}!`,
      body: `${titulo} esta disponible en el grupo ${grupo}`,
      icon: `https://goo.gl/Fz9nrQ` + obraId
    }
  });
}

