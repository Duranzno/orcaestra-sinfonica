
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
export const AnonMenu: Menu[] = [
  {
    'name': 'Iniciar Sesión',
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
export const AdminMenu: Menu[] = [
  {
    'name': 'Admin',
    'link': '/auth/admin',
    'icon': 'input',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  }
];

export const UserMenu: Menu[] = [
  {
    'name': 'Musica',
    'link': '',
    'icon': 'face',
    'isAdmin': false,

    'isUser': true,
    'chip': false,
    'open': false,
    'sub': [],
  },
  {
    'name': 'Partitura Generica',
    'link': '/music-list/score',
    'icon': 'input',
    'chip': false,
    'open': false,
    'isAdmin': false,
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
