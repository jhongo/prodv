import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Encuentro } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  equiposInfo: Subscription;
  team: Encuentro[] = [];
  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fechae: 0,
    fecha: '',
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'iniciado',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
  }
  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getPartidos();
  }
  async getPartidos() {
    const path = 'Partidos';
    this.equiposInfo = this.firestoreService.getTeam<Encuentro>(path).subscribe(res => {
      this.team = res;
    });
  }

}
