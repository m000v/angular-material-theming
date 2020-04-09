import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-material-theming';
  theme: string;

  opened = true;
  over: 'over' | 'push' | 'side' = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode: 'default' | 'flat' = 'flat';

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  watcher: Subscription;


  userName = 'John Doe';
  userEmail = 'john@doe.com';
  userImage = './assets/img/johndoe.jpg';

  constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer, media: MediaObserver) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => this.theme = theme);
    this.overlayContainer.getContainerElement().classList.add(this.theme);
    this.opened = window.innerWidth >= 768;
  }

}
