import { Menu, AdminMenu, UserMenu } from './menu.elements';
import { IUser } from 'src/app/core/models';

const findSub = (m: Menu) => m.name === 'Musica';
export function mapMenuAdmin(user: IUser): Menu[] {
  return (user.isAdmin)
    ? AdminMenu.concat(UserMenu)
    : UserMenu;

}
export function mapMenuGenres(user: IUser, subs: Menu[], menu: Menu[]) {
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
