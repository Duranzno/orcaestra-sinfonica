
export interface IMenu {
  name: string;
  link: string;
  icon?: string;
  svgIcon?: string;
  isUser?: boolean;
  chip?: boolean;
  open?: boolean;
  sub?: IMenu[];
  isAdmin?: boolean;
}
export class Menu implements IMenu {
  name: string;
  link: string;
  icon?: string;
  svgIcon?: string;
  isUser?: boolean;
  chip?: boolean;
  open?: boolean;
  sub?: IMenu[];
  isAdmin?: boolean;
  constructor(i: Menu) {
    this.name = i.name;
    this.link = i.link;
    this.icon = (i.icon) ? i.icon : 'input';
    this.svgIcon = (i.svgIcon) ? i.svgIcon : '';
    this.isUser = (i.isUser) ? i.isUser : true;
    this.chip = (i.chip) ? i.chip : false;
    this.open = (i.open) ? i.open : false;
    this.sub = (i.sub) ? i.sub : [];
    this.isAdmin = (i.isAdmin) ? i.isAdmin : false;

  }
}
export const AnonMenu: IMenu[] = [
  {
    'name': 'Iniciar Sesión',
    'link': '/login',
    'icon': 'exit_to_app',
    'chip': false,
    'open': false,
    'isAdmin': false,
  },
  {
    'name': 'Registrarse',
    'link': '/signup',
    'icon': 'person_add',
    'chip': false,
    'open': false,
    'isAdmin': false,
  }
];
export const AdminMenu: IMenu[] = [
  {
    'name': 'Administrar Obras',
    'link': '/admin/partitura',
    'icon': 'build',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  },
  {
    'name': 'Administrar Categorias',
    'link': '/admin/categorias',
    'icon': 'bookmarks',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  },
  {
    'name': 'Agregar Partitura',
    'link': '/admin/carga',
    'icon': 'note_add',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': true,
  }
];

export const UserMenu: IMenu[] = [
  {
    'name': 'Musica',
    'link': '',
    'svgIcon': 'musical-note',
    'isAdmin': false,

    'isUser': true,
    'chip': false,
    'open': false,
    'sub': [],
  },
  {
    'name': 'Creador de PDF',
    'link': '/pdf',
    'svgIcon': 'pdf',
    'isAdmin': false,
    'isUser': true,
    'chip': false,
    'open': false,
    'sub': [],
  },
  {
    'name': 'Cerrar Sesion',
    'link': '/logout',
    'icon': 'power_settings_new',
    'isUser': true,
    'chip': false,
    'isAdmin': false,
    'open': false,
  },
];
export const MusicSubMenu: IMenu[] = [
  {
    'name': 'Favoritos',
    'link': '/musica/lista/favoritos',
    'icon': 'favorite',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': false,
  },
  {
    'name': 'Todos',
    'link': '/musica/lista',
    'icon': 'waves',
    'isUser': true,
    'chip': false,
    'open': false,
    'isAdmin': false,
  },

];