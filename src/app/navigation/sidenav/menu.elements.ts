
export interface Menu {
  name: string;
  link: string;
  icon?: string;
  svgIcon?: string;
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
export const AdminMenu: Menu[] = [
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
    'name': 'Agregar Partitura',
    'link': '/admin/carga',
    'icon': 'note_add',
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
    'svgIcon': 'musical-note',
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
