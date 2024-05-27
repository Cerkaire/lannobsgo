import Dexie from 'dexie';
import { observatories } from '../data/observatoires';
export const db = new Dexie('formDataDB');  // database is database name with 1 version 
db.version(1).stores({
  user: '++id, mail , pass',
  species: '++id, cdnom, nom, nomvern, observatoire',
  observatoire: '++id, titre, metakey, icon, couleur, nomvar, nom, nomdeux, latin, indice, saisie, categorie, description',
  orga: '++id, idorg, organisme',
  observateurs: '++id,idobser,nom,prenom',
  etude: '++id, idetude, etude',
  protocole: '++id, idprot, protocole',
  fiche: '++id, codecom, date, datef, flou, hdeb, hfin, idcoord, iddep, idetude, idfiche, idorg, idsite, lat, lng, site, syn, typedon',
  obs: '++id, cdnom,idetude,idfiche,idobs,nom,observa, syn',
  ligne: '++id, denom,etatbio,idligne,idobs,idstade,meth,male,fem,ndiff,pros,stade,syn,tdenom',
  coord: '++id, codecom, geo, idcoord, iddep, idsite, lat, lng, site'
});
