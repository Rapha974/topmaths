import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/mystyles.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  ongletActif: string
  event$: any

  constructor(private router: Router, public dataService: ApiService) {
    this.redirectionHTTPS()
    this.ongletActif = 'accueil'
    this.recupereOngletActif()
    this.recupereProfil()
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  redirectionHTTPS(){
    if (window.location.protocol == 'http:') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }

  /**
   * Vérifie la présence d'un token de connexion et récupère le profil utilisateur le cas échéant
   */
  recupereProfil() {
    const identifiant = this.dataService.getToken()
    if (identifiant != null) {
      this.dataService.login(identifiant)
    }
  }
  /**
   * Récupère l'onglet actif à partir de l'url pour le mettre en surbrillance.
   */
  recupereOngletActif() {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.ongletActif = event.url.split('/')[1]
        if (this.ongletActif == '') {
          this.ongletActif = 'accueil'
        }
      }
    });
  }

  /**
   * Supprime le token de clé 'identifiant' utilisé pour vérifier si l'utilisateur est connecté.
   * Supprime aussi le token de clé 'lienAvatar'
   * Toggle les profilbtn et loginbtn.
   * Renvoie vers l'accueil.
   */
  logout() {
    this.dataService.deleteToken();
    this.dataService.user.identifiant = ''
    this.dataService.user.lienAvatar = ''
    this.router.navigate(['accueil'])
  }
}
