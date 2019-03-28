import { IMenu, AdminMenu, UserMenu } from './menu.elements';
import { IUser } from 'src/app/core/models';

const findSub = (m: IMenu) => m.name === 'Musica';
export function mapMenuAdmin(user: IUser): IMenu[] {
  return (user.isAdmin)
    ? AdminMenu.concat(UserMenu)
    : UserMenu;

}
export function mapMenuGenres(user: IUser, subs: IMenu[], menu: IMenu[]) {
  if (user.nombre !== '') {
    return menu.reduce((arr: IMenu[], m: IMenu): IMenu[] => {
      m.sub = (findSub(m)) ? subs : [];
      return arr.concat(m);
    }, []);
  } else {
    return menu;
  }
}
