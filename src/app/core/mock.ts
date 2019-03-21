import { IMedia, OrigenTipo, MediaTipo, RegistroTipo, Score, PersonaTipo, User, Media, IScore } from './models';

const mediaArr: IMedia[] = [
  {
    'origenArray': [
      { 'url': '/assets/9th/sheet.jpg', 'tipo': OrigenTipo.ASSETS },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'tipo': OrigenTipo.FIREBASE },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'tipo': OrigenTipo.DROPBOX },
    ],
    'tipo': MediaTipo.IMG
  },
  {
    'origenArray': [{ 'url': '/assets/9th/beethoven.jpg', 'tipo': OrigenTipo.ASSETS }],
    'tipo': MediaTipo.AVATAR
  },
  {
    'origenArray': [{ 'url': '/assets/9th/beethoven.pdf', 'tipo': OrigenTipo.ASSETS }],
    'tipo': MediaTipo.PDF
  },
  {
    'origenArray': [{ 'url': '/assets/9th/beethoven.mid', 'tipo': OrigenTipo.ASSETS }],
    'tipo': MediaTipo.MIDI
  },
  {
    'origenArray': [{ 'url': '/assets/9th/beethoven.mp3', 'tipo': OrigenTipo.ASSETS }],
    'tipo': MediaTipo.MP3
  },
  {
    'origenArray': [{ 'url': 'https://www.youtube.com/watch?v=-kcOpyM9cBg', 'tipo': OrigenTipo.OTROS }],
    'tipo': MediaTipo.YOUTUBE
  }
];
const media = mediaArr.map(m => new Media(m));
export const iScore: IScore = {
  'almacenamiento': [
    {
      'tipo': RegistroTipo.SCORE,
      'cantidad': 2
    }
  ],
  'generos': [
    'Barroco'
  ],
  'gente': [
    {
      'nombre': 'Alejandro',
      'tipo': PersonaTipo.UPLOADER,
      'apellido': 'Go'
    },
    {

      'nombre': 'Ludwing',
      'tipo': PersonaTipo.AUTOR,
      'apellido': 'Beethoven'
    }
  ],
  'instrumentos': ['Violin', 'Piano'],
  'media': [],
  // tslint:disable-next-line:max-line-length
  'extrainfo': 'La Sinfonía n.º 9 en re menor, op. 125, conocida también como "Coral", es la última sinfonía completa del compositor alemán Ludwig van Beethoven. Es una de las obras más trascendentales, importantes y populares de la música y el arte. Su último movimiento es un final coral sorprendentemente inusual en su época que se ha convertido en símbolo de la libertad. Precisamente, una adaptación de la sinfonía, realizada por Herbert von Karajan es, desde 1972, el himno de la Unión Europea (UE).1​ En 2001, la partitura original de la sinfonía se inscribió en el Registro de la Memoria del Mundo de la UNESCO, donde forma parte, junto con otros sobresalientes monumentos, de la herencia espiritual de la humanidad',
  'obra': 'Sinfonía n.º 9 '
};

export const score = new Score(iScore);
export const mockUser: User = new User({
  email: 'aledurax@gmail.com',
  nombre: 'alejandro',
  apellido: 'duran',
  password: '123',
  group: 'Coro',
  isAdmin: true
}
);
