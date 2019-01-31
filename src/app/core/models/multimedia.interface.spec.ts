
import { IMedia, MediaType, MediaOriginType, Media, MediaArray } from './multimedia.interface';

const media = new Media({
  'originArray': [{ 'url': '/assets/9th/sheey.jpg', 'type': MediaOriginType.ASSETS }],
  'type': MediaType.IMG
});
const arr: IMedia[] = [
  {
    'originArray': [
      { 'url': '/assets/9th/sheey.jpg', 'type': MediaOriginType.ASSETS },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': MediaOriginType.FIRESTORE },
      { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': MediaOriginType.DROPBOX },
    ],
    'type': MediaType.IMG
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.jpg', 'type': MediaOriginType.ASSETS }],
    'type': MediaType.AVATAR
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.pdf', 'type': MediaOriginType.ASSETS }],
    'type': MediaType.PDF
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.mid', 'type': MediaOriginType.ASSETS }],
    'type': MediaType.MIDI
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.mp3', 'type': MediaOriginType.ASSETS }],
    'type': MediaType.MP3
  },
  {
    'originArray': [{ 'url': '/assets/9th/beethoven.mxml', 'type': MediaOriginType.ASSETS }],
    'type': MediaType.MXML
  },
];
const mediaArray: MediaArray = new MediaArray(arr as Media[]);
// tslint:disable-next-line:max-line-length
const resultByType = [
  [
    { 'url': '/assets/9th/sheey.jpg', 'type': 'assets' },
    { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': 'firestore' },
    { 'url': 'http://www.firestore.com/9th/sheet.jpg', 'type': 'dropbox' }
  ]
];
const res = mediaArray.getByTypeAndOrigin(MediaType.MP3, MediaOriginType.ASSETS);
console.log(JSON.stringify(res));
