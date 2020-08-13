import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { RespTopHeadLines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  noticias: Article[] = [];

  categoria: string;

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit(){

    this.cargarNoticias(this.categorias[0]);

  }

  ionViewDidEnter(){
    this.segment.value = this.categorias[0];
  }


  cambioCategoria( event ){
    this.noticias = [];
    this.cargarNoticias( event.detail.value );
  }

  cargarNoticias( categoria: string, event? ){

    this.noticiasService.getTopHeadLinesCategoria( categoria )
      .subscribe( data => {
        console.log(data);
        this.noticias.push( ...data.articles );

        if (event){
          event.target.complete();
        }
      });

  }

  loadData(event){
    this.categoria = this.segment.value;
    console.log(this.categoria);
    this.cargarNoticias( this.categoria, event );

  }

}
