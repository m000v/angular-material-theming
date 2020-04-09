import {Component, Input, OnInit} from '@angular/core';
import {Theme, ThemeService} from '../core/services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  theme: string;
  themes: Array<Theme>;
  showSearch = false;
  @Input() sidenav: any;
  constructor(private themeService: ThemeService) {
    this.themes = this.themeService.themes;
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => this.theme = theme);
  }

  setTheme(theme: string): void {
    const t = this.themes.find(x => x.name === theme);
    if (t) {
      this.themeService.changeTheme(t.name);
    }
  }

}
