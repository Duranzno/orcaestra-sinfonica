export interface Menu {
  name: string;
  link: string;
  icon: string;
  isUser?: boolean;
  chip?: boolean;
  open?: boolean;
  sub?: Menu[];
  isAdmin?: boolean;
}
export const loggedOutMenu: Menu[] = [
  {
    'name': 'Inicio de Sesion',
    'link': '/login',
    'icon': 'input',
    'chip': false,
    'open': false,
    'isAdmin': false,
  },
  {
    'name': 'Registrarse',
    'link': '/signup',
    'icon': 'face',
    'chip': false,
    'open': false,
    'isAdmin': false,
  }
];
export const menus: Menu[] = [
  {
    'name': 'Admin',
    'link': '/upload',
    'icon': 'input',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  },
  {
    'name': 'Musica',
    'link': '/music-list',
    'icon': 'face',
    'isAdmin': false,

    'isUser': true,
    'chip': false,
    'open': false,
    'sub': [],
  },
  {
    'name': 'Cerrar Sesion',
    'link': '/logout',
    'icon': 'eject',
    'isUser': true,
    'chip': false,
    'isAdmin': false,
    'open': false,
  },
];
