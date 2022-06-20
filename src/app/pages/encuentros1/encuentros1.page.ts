import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, IonDatetime, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Equipos, Campeonatos, EncuentroPrueba, fase } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-encuentros1',
  templateUrl: './encuentros1.page.html',
  styleUrls: ['./encuentros1.page.scss'],
})
export class Encuentros1Page implements OnInit {

  infocampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
    fases: 0
  };
  antsig = false;


  numerofases = [];

  estado = false;
  grupo = false;
  grupo1 = false;
  grupo2 = false;
  gene = false;
  equiposInfo: Subscription;
  equipo1Info: Subscription;
  equipo2sInfo: Subscription;
  numero = 0;
  fecha = false;
  team1: Equipos[] = [];
  team2: Equipos[] = [];
  teamg: Equipos[] = [];
  teamd: Equipos[] = [];
  genee: EncuentroPrueba[] = [];
  genef: EncuentroPrueba[] = [];
  geneinit: EncuentroPrueba[] = [];
  geneida: EncuentroPrueba[] = [];
  geneidainit: EncuentroPrueba[] = [];
  geneidaf: EncuentroPrueba[] = [];
  genevuel: EncuentroPrueba[] = [];
  genevuelinit: EncuentroPrueba[] = [];
  genevuelf: EncuentroPrueba[] = [];

  grupoe1: EncuentroPrueba[] = [];
  grupoe2: EncuentroPrueba[] = [];
  grupoinit1: EncuentroPrueba[] = [];
  grupoinit2: EncuentroPrueba[] = [];
  grupof1: EncuentroPrueba[] = [];
  grupof2: EncuentroPrueba[] = [];

  fase = "";
  titulo = "";
  gru1 = false;
  gru2 = false;
  ida = false;
  vuelta = false;
  descenso = false;

  escudo1 = '';
  escudo2 = '';
  uid1 = '';
  uid2 = '';

  equipo1: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0
  };

  equipo2: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0


  };

  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'
  formatedString = '';

  encuentro: EncuentroPrueba = {
    uid: '',
    fechae: '',
    numero: 0,
    tipo: '',
    fecha: null,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'espera',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
  }
  encuentropri: EncuentroPrueba = {
    uid: '',
    fechae: '',
    numero: 0,
    tipo: '',
    fecha: null,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'espera',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
  }

  items;
  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) {
    // this.numerofases.unshift({
    //   id: -1,
    //   name: 'Select All'
    // });
  }

  ngOnInit() {

    const campeonato = this.firestoreService.getCampeonato();
    if (campeonato !== undefined) {
      this.infocampeonato = campeonato;

    }
    console.log(this.infocampeonato);
    this.getPartidos();
    this.fases();

    const name_1 = "Fecha 10";  

    console.log(this.obtenernumofstring(name_1));// Nos devolverá 136140
  }


 obtenernumofstring(string) {
    var tmp = string.split("");
    var map = tmp.map(function (current) {
      if (!isNaN(parseInt(current))) {
        return current;
      }
    });

    var numbers = map.filter(function (value) {
      return value != undefined;
    });

    return numbers.join("");
  }


  onChange(evt) {
    if (evt == -1) {
      this.items = this.numerofases.map(x => x.id);
    } else {
      let selectAllIndex = this.items.indexOf(-1);
      this.items.splice(selectAllIndex, 1);
      console.log(selectAllIndex);
    }
    console.log(this.items);
  }


  getItem(cod: number) {
    const getSelectd = cod;//Aquí envío el valor seleccionado
    this.encuentro.numero = cod;
    console.log("index", cod);
    // this.getInventoryList();//Ésta es la función que traerá el servicio que necesito
  }

  async fases() {
    const n = this.infocampeonato.fases;
    for (var a = 1; a <= n; a++) {
      this.numerofases = [...this.numerofases, 'Fecha ' + a];
    }
  }

  async pruebamensaje(num: number) {
    console.log("Numero es ", num);
    this.encuentro.numero = num;

  }


  async anterior() {

    if (this.numero > 1) {

      this.numero = this.numero - 1;

    }

    console.log(this.numero)

    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
      this.titulo = "Fecha " + this.numero;
      this.grupos("Fecha " + this.numero);
      this.gruposfinalizados("Fecha " + this.numero);
      this.partidos_init_fases("Fecha " + this.numero);
      this.genee = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 1) {

      this.titulo = "Descenso"
      this.prueba("Descenso");
      this.pruebafina("Descenso");
      this.partidos_init("Descenso");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;

    } else if (this.numero == this.infocampeonato.fases + 2) {
      this.titulo = "Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.partidos_ida_vuel_E("Cuartos de final");
      this.partidos_ida_vuel_init("Cuartos de final");
      this.partidos_ida_vuel_fina("Cuartos de final");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 3) {
      this.titulo = "Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 4) {
      this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 5) {
      this.titulo = "Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    }
  }

  async siguiente() {
    if (this.numero < this.infocampeonato.fases + 5) {

      this.numero = this.numero + 1;

    }

    console.log(this.numero)
    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
      this.titulo = "Fecha " + this.numero;
      this.grupos("Fecha " + this.numero);
      this.gruposfinalizados("Fecha " + this.numero);
      this.partidos_init_fases("Fecha " + this.numero);
      this.genee = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 1) {

      this.titulo = "Descenso"
      this.prueba("Descenso");
      this.pruebafina("Descenso");
      this.partidos_init("Descenso");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;

    } else if (this.numero == this.infocampeonato.fases + 2) {
      this.titulo = "Cuartos de final"
      this.prueba("Cuartos de final");
      this.pruebafina("Cuartos de final");
      this.partidos_init("Cuartos de final");
      this.partidos_ida_vuel_E("Cuartos de final");
      this.partidos_ida_vuel_init("Cuartos de final");
      this.partidos_ida_vuel_fina("Cuartos de final");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 3) {
      this.titulo = "Semifinal";
      this.prueba("Semifinal");
      this.pruebafina("Semifinal");
      this.partidos_init("Semifinal");
      this.partidos_ida_vuel_E("Semifinal");
      this.partidos_ida_vuel_init("Semifinal");
      this.partidos_ida_vuel_fina("Semifinal");
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 4) {
      this.titulo = "Tercero y Cuarto";
      this.prueba("Tercero y Cuarto");
      this.pruebafina("Tercero y Cuarto");
      this.partidos_init("Tercero y Cuarto");
      this.partidos_ida_vuel_E("Tercero y Cuarto");
      this.partidos_ida_vuel_init("Tercero y Cuarto");
      this.partidos_ida_vuel_fina("Tercero y Cuarto");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero == this.infocampeonato.fases + 5) {
      this.titulo = "Final";
      this.prueba("Final");
      this.pruebafina("Final");
      this.partidos_init("Final");
      this.partidos_ida_vuel_E("Final");
      this.partidos_ida_vuel_init("Final");
      this.partidos_ida_vuel_fina("Final");
      this.grupoinit1 = [];
      this.grupoinit2 = [];
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru2 = false;
      this.gru1 = false;
      this.ida = false;
      this.vuelta = false;
    }
  }

  async getPartidos() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getPartidos<EncuentroPrueba>(path).subscribe(res => {
      console.log(res.length);
      if (res.length) {
        this.antsig = true;
      } else {
        this.antsig = false;
      }

      // for (let a=0; a<=res.length;a++){
      //     this.encuentronuevo=res[a];
      //     this.guardarnuevo(this.encuentronuevo,this.encuentronuevo.uid);

      //   }
      this.encuentropri = res[0];


      if (this.encuentropri.fechae == "ida" || this.encuentropri.fechae == "vuelta" || this.encuentropri.fechae == "unico") {
        this.titulo = this.encuentropri.tipo;
      } else {
        this.titulo = this.encuentropri.fechae;
      }
      this.numero = this.encuentropri.numero;
      this.fase = this.encuentropri.fechae;

      if (this.fase == "ida" || this.fase == "vuelta" || this.fase == "unico") {
        this.prueba(this.encuentropri.tipo);
        this.pruebafina(this.encuentropri.tipo);
        this.partidos_init(this.encuentropri.tipo);
        this.partidos_ida_vuel_E(this.encuentropri.tipo);
        this.partidos_ida_vuel_init(this.encuentropri.tipo);
        this.partidos_ida_vuel_fina(this.encuentropri.tipo);

      } else {
        this.genee = [];
        this.genef = [];
        this.geneinit = [];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
      }
    });
  }

  async prueba(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollection<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {
      this.genee = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }
  async pruebafina(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {
      this.genef = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }
  async partidos_init(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getpartidos_init<EncuentroPrueba>(path, 'tipo', '==', tipo, "unico").subscribe(res => {

      this.geneinit = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;


    });

  }

  async partidos_ida_vuel_E(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneida = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuel = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupoinit1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_init(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidainit = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuelinit = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_fina(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "ida").subscribe(res => {
      this.geneidaf = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<EncuentroPrueba>(path, 'tipo', '==', tipo, "vuelta").subscribe(res => {
      this.genevuelf = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }



  async grupos(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupoe1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongrupos<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupoe2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

  }
  async gruposfinalizados(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupof1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupof2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });


  }
  async partidos_init_fases(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupoinit1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getgruposinit<EncuentroPrueba>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupoinit2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });



  }




  setToday() {
    this.formatedString = format(parseISO(format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyy');
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.encuentro.fecha = value;
    console.log(value);
  }



  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  async restart() {

    this.encuentro = {
      uid: '',
      tipo: '',
      fechae: '',
      numero: 0,
      fecha: null,
      grupo: '',
      uid_e1: '',
      uid_e2: '',
      estado: 'espera',
      res_e1: 0,
      res_e2: 0,
      escudo_e1: '',
      escudo_e2: '',
      nombre_e1: '',
      nombre_e2: '',
    };

  }


  async getEquiposG1() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'grupo1').subscribe(res => {
      if (res.length) {
        this.team1 = res;
      }
    });
  }
  async getEquiposG2() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'grupo2').subscribe(res => {
      if (res.length) {
        this.team2 = res;
      }
    });
  }

  async getEquiposG() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '!=', 'Descenso').subscribe(res => {
      if (res.length) {
        this.teamg = res;
      }
    });
  }

  async getEquiposDes() {
    ; const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'Descenso').subscribe(res => {
      if (res.length) {
        this.teamd = res;
      }
    });
  }


  async completardatos(uid: string) {

    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    const pathp = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];
        this.escudo1 = this.equipo1.escudo;
        this.uid1 = this.equipo1.uid;
        this.encuentro.escudo_e1 = this.escudo1;
        this.encuentro.uid_e1 = this.uid1;
        const data = {
          escudo_e1: this.escudo1,
          uid_e1: this.uid1
        }
        console.log(data, this.equipo1)

        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });


      }
    });

    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e2).subscribe(res => {
      if (res.length) {
        this.equipo2 = res[0];
        // console.log(res[0]);
        // console.log(this.equipo2.escudo);
        this.escudo2 = this.equipo2.escudo;
        this.uid2 = this.equipo2.uid;
        this.encuentro.escudo_e2 = this.escudo2;
        this.encuentro.uid_e2 = this.uid2;
        const data = {
          escudo_e2: this.escudo2,
          uid_e2: this.uid2
        }
        console.log(data)
        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });


      }
    });

    console.log(this.encuentro);


  }

  async getMatch(equipo: EncuentroPrueba) {
    console.log('Click en getEquipo');
    console.log(equipo);
    this.firestoreService.setMatch(equipo);

  }

  async reset() {
    this.estado = false;
    this.grupo = false;
    this.grupo1 = false;
    this.grupo2 = false;
    this.fecha = false;
    this.gene = false;
    this.encuentro.nombre_e1 = "";
    this.encuentro.nombre_e2 = "";
    this.encuentro.fechae = "";
    this.encuentro.grupo = "";
    this.encuentro.tipo = "";

  }
  async saveMatch() {
   

    console.log(this.encuentro.fechae, this.encuentro.numero);
    this.encuentro.uid = this.firestoreService.getId();
    if (this.encuentro.tipo == "") {
      this.presentToast("Eliga el tipo de partido", 2000);
    } else {
      if (this.encuentro.nombre_e1 == "" || this.encuentro.nombre_e2 == "") {
        this.presentToast("Eliga los equipos", 2000);
      } else {
        if (this.encuentro.nombre_e1 == this.encuentro.nombre_e2) {
          this.presentToast("Los equipos son los mismos", 2000);
        } else {

          console.log(this.encuentro.nombre_e1 + " " + this.encuentro.nombre_e2);
          if (this.encuentro.tipo == "Descenso") {
            this.encuentro.fechae = "unico";
          }
          if (this.encuentro.tipo == "Fase de grupos") {

            if(this.encuentro.fechae==""){
              this.presentToast("elija la fecha del encuentro", 2000);

            }else{
              this.encuentro.numero= parseInt(this.obtenernumofstring(this.encuentro.fechae));
              
              
            }

            const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
            this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
              console.log('guardado con exito');
              this.presentLoading('Guardando partido', 1500);
              this.completardatos(this.encuentro.uid);
              this.encuentro = {
                uid: '',
                tipo: '',
                fechae: '',
                numero: 0,
                fecha: null,
                grupo: '',
                uid_e1: '',
                uid_e2: '',
                estado: 'espera',
                res_e1: 0,
                res_e2: 0,
                escudo_e1: '',
                escudo_e2: '',
                nombre_e1: '',
                nombre_e2: '',
              };
              this.estado = false;
              this.grupo = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.fecha = false;
              this.gene = false;
              this.gru1 = false;
              this.gru2 = false;
              this.descenso = false;
              this.grupoe1 = [];
              this.grupoe2 = [];
              this.grupof1 = [];
              this.grupof2 = [];
              this.genef = [];
              this.genee = [];
              this.grupoinit1 = [];
              this.grupoinit2 = [];
              this.geneida = [];
              this.genevuel = [];
              this.geneidainit = [];
              this.geneidaf = [];
              this.genevuel = [];
              this.genevuelinit = [];
              this.genevuelf = [];

            }).catch(error => {
              console.log(error)
            });

          } else {
            if (this.encuentro.fechae == "") {
              this.presentToast("Eliga tipo de encuentro", 2000);

            } else {
              const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
              this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
                console.log('guardado con exito');
                this.presentLoading('Guardando partido', 1500);
                this.completardatos(this.encuentro.uid);
                this.encuentro = {
                  uid: '',
                  tipo: '',
                  fechae: '',
                  numero: 0,
                  fecha: null,
                  grupo: '',
                  uid_e1: '',
                  uid_e2: '',
                  estado: 'espera',
                  res_e1: 0,
                  res_e2: 0,
                  escudo_e1: '',
                  escudo_e2: '',
                  nombre_e1: '',
                  nombre_e2: '',
                };
                this.estado = false;
                this.grupo = false;
                this.grupo1 = false;
                this.grupo2 = false;
                this.fecha = false;
                this.gene = false;
                this.gru1 = false;
                this.gru2 = false;
                this.descenso = false;
                this.grupoe1 = [];
                this.grupoe2 = [];
                this.grupof1 = [];
                this.grupof2 = [];
                this.genef = [];
                this.genee = [];
                this.grupoinit1 = [];
                this.grupoinit2 = [];
                this.geneida = [];
                this.genevuel = [];
                this.geneidainit = [];
                this.geneidaf = [];
                this.genevuel = [];
                this.genevuelinit = [];
                this.genevuelf = [];
              }).catch(error => {
                console.log(error)
              });

            }


          }



        }
      }
    }

  }

  async newFecha() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Seleccione fecha: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 1',
          value: 'Fecha 1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 2',
          value: 'Fecha 2'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 3',
          value: 'Fecha 3'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 4',
          value: 'Fecha 4'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Fecha 5',
          value: 'Fecha 5'
        },



      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Fecha 1') {
              this.encuentro.fechae = data;
              this.encuentro.numero = 1;
            }
            if (data === 'Fecha 2') {
              this.encuentro.fechae = data;
              this.encuentro.numero = 2;
            }
            if (data === 'Fecha 3') {
              this.encuentro.fechae = data;
              this.encuentro.numero = 3;
            }
            if (data === 'Fecha 4') {
              this.encuentro.fechae = data;
              this.encuentro.numero = 4;
            } if (data === 'Fecha 5') {
              this.encuentro.fechae = data;
              this.encuentro.numero = 5;
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async newMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de partido: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fase de grupos',
          value: 'Fase de grupos',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Descenso',
          value: 'Descenso'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Cuartos de final',
          value: 'Cuartos de final'
        },
        {
          name: 'radio3',
          type: 'radio',
          cssClass: 'input',
          label: 'Semifinal',
          value: 'Semifinal'
        },
        {
          name: 'radio4',
          type: 'radio',
          cssClass: 'input',
          label: 'Tercero y Cuarto',
          value: 'Tercero y Cuarto'
        },
        {
          name: 'radio4',
          type: 'radio',
          cssClass: 'input',
          label: 'Final',
          value: 'Final'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Fase de grupos') {
              this.encuentro.tipo = data;
              this.gene = false;
              this.descenso = false;
              this.grupo = true;
              this.fecha = true;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";

            } if (data === 'Descenso') {
              this.encuentro.tipo = data;
              this.descenso = true;
              this.gene = false;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 1;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposDes();

            }
            if (data === 'Cuartos de final') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 2;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();
            }
            if (data === 'Semifinal') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 3;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();
            }
            if (data === 'Tercero y Cuarto') {

              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 4;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();

            } if (data === 'Final') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 5;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.fechae = "";
              this.encuentro.grupo = "";
              this.getEquiposG();

            }
          }

        }
      ]
    });
    await alert.present();
  }

  async newTeam() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Partido del grupo: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Grupo A',
          value: 'Grupo 1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Grupo B',
          value: 'Grupo 2'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Grupo 1') {
              this.encuentro.grupo = data;
              this.grupo1 = true;
              this.grupo2 = false;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.getEquiposG1();
            }
            if (data === 'Grupo 2') {
              this.grupo1 = false;
              this.grupo2 = true;
              this.encuentro.nombre_e1 = "";
              this.encuentro.nombre_e2 = "";
              this.encuentro.grupo = data;
              this.getEquiposG2();
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: "middle"
    });
    toast.present();
  }

  async presentLoading(mensaje: string, tiempo: number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
