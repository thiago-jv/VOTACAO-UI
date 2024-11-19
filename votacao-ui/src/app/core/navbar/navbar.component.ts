import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

    ngOnInit() {
      this.items = [
        {
          label: 'Associado',
          icon: 'pi pi-users',
          items: [
            { label: 'Novo', routerLink: ['/associados/novo'], icon: 'pi pi-plus' },
            { label: 'Pesquisa', routerLink: ['/associados'], icon: 'pi pi-search' }
          ]
        },
        {
          label: 'Pauta',
          icon: 'pi pi-list',
          items: [
            { label: 'Novo', routerLink: ['/pautas/novo'], icon: 'pi pi-plus' }, 
            { label: 'Pesquisa', routerLink: ['/pautas'], icon: 'pi pi-search' } 
          ]
        },
        {
          label: 'Votação',
          routerLink: ['/votacao/novo'],
          icon: 'pi pi-check-square'
        }
      ];
      
    }
}

