import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OverlayContainer} from '@angular/cdk/overlay';

export interface Theme {
  name: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes: Array<Theme> = [
    {name: 'light-indigo-theme', title: 'Light Indigo (default)'},
    {name: 'light-crypto-theme', title: 'Light Crypto'},
    {name: 'dark-crypto-theme', title: 'Dark Crypto'},
    {name: 'light-purple-theme', title: 'Light Purple'},
    {name: 'dark-purple-theme', title: 'Dark Purple'},
    {name: 'dark-yellow-theme', title: 'Dark Yellow'},
    {name: 'dark-pink-theme', title: 'Dark Pink'},
  ];
  private themeSource = new BehaviorSubject(localStorage.getItem('currentTheme') || environment.defaultTheme);
  currentTheme = this.themeSource.asObservable();

  constructor(private overlayContainer: OverlayContainer) {
  }

  changeTheme(theme: string): void {
    this.themeSource.next(theme);
    localStorage.setItem('currentTheme', theme);

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }
}
