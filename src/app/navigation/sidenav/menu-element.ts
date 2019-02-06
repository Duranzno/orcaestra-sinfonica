export interface IMenu {
  name: string;
  link: string;
  icon: string;
  chip?: boolean;
  open?: boolean;
  admin?: boolean;
}
export class Menu implements IMenu {
  constructor(
    public name: string,
    public link: string,
    public icon: string,
    public chip: boolean = false,
    public open: boolean = false,
    public admin: boolean = false
  ) { }

}
export const menus: Menu[] = [
  {
    'name': 'Inicio de Sesion',
    'link': '/login',
    'icon': 'input',
    'chip': false,
    'open': false,
    'admin': false,
  },
  {
    'name': 'Registrarse',
    'link': '/signup',
    'icon': 'face',
    'chip': false,
    'open': false,
    'admin': false,
  },
  {
    'name': 'Subir Partitura',
    'link': '/upload',
    'icon': 'input',
    'chip': false,
    'open': false,
    'admin': true,
  },
  {
    'name': 'Lista de Musica',
    'link': '/music-list',
    'icon': 'face',
    'chip': false,
    'open': false,
    'admin': false,
  },
  {
    'name': 'Detalles Musica',
    'link': '/music-detail',
    'icon': 'face',
    'chip': false,
    'open': false,
    'admin': false,
  },
  {
    'name': 'Partitura',
    'link': '/sheet',
    'icon': 'face',
    'chip': false,
    'open': false,
    'admin': false,
  },
  {
    'name': 'Cerrar Sesion',
    'link': '/logout',
    'icon': 'eject',
    'chip': false,
    'admin': false,
    'open': false,
  },
];
