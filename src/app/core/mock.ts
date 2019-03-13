import { IMedia, OriginType, MediaType, StoredType, Score, PersonaTipo, User, Media, IScore } from './models';

const mediaArr: IMedia[] = [
  {
    'originArray': [
      { 'url': '/assets/9th/sheet.jpg', 'type': OriginType.ASSETS },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': OriginType.FIREBASE },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': OriginType.DROPBOX },
    ],
    'type': MediaType.IMG
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.jpg', 'type': OriginType.ASSETS }],
    'type': MediaType.AVATAR
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.pdf', 'type': OriginType.ASSETS }],
    'type': MediaType.PDF
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.mid', 'type': OriginType.ASSETS }],
    'type': MediaType.MIDI
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.mp3', 'type': OriginType.ASSETS }],
    'type': MediaType.MP3
  },
  {
    'originArray': [
      { 'url': '/assets/9th/beethoven.mxml', 'type': OriginType.ASSETS },
      // tslint:disable-next-line:max-line-length
      { 'url': 'https://raw.githubusercontent.com/opensheetmusicdisplay/opensheetmusicdisplay/develop/test/data/ActorPreludeSample.xml', 'type': OriginType.OTHER },
    ],
    'type': MediaType.MXML
  },
  {
    'originArray': [{ 'url': 'https://www.youtube.com/watch?v=-kcOpyM9cBg', 'type': OriginType.OTHER }],
    'type': MediaType.YOUTUBE
  }
];
const media = mediaArr.map(m => new Media(m));
export const iScore: IScore = {
  'almacenamiento': [
    {
      'tipo': StoredType.SCORE,
      'cantidad': 2
    }
  ],
  'generos': [
    'Barroco'
  ],
  'its': 1,
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
