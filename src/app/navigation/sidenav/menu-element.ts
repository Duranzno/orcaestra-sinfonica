import { User } from 'src/app/core/models';

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
export const AdminMenu: Menu[] = [
  {
    'name': 'Admin',
    'link': '/upload',
    'icon': 'input',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  }
];
const findSub = (m: Menu) => m.name === 'Musica';
export function mapMenuAdmin(user: User): Menu[] {
  return (user.isAdmin) ? AdminMenu.concat(UserMenu) : UserMenu;

}
export function mapMenuGenres(user: User, subs: Menu[], menu: Menu[]) {
  if (user.nombre !== '') {
    return menu.reduce((arr: Menu[], m: Menu): Menu[] => {
      m.sub = (findSub(m)) ? subs : [];
      return arr.concat(m);
    }, []);
  }
  else {
    return menu;
  }
}

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
    'name': 'Cerrar Sesion',
    'link': '/logout',
    'icon': 'eject',
    'isUser': true,
    'chip': false,
    'isAdmin': false,
    'open': false,
  },
];
