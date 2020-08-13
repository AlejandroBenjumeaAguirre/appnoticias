import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

// In App Browser
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DatalocalService } from '../../services/datalocal.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DatalocalService) { }

  ngOnInit() {
    console.log('favorito', this.enFavoritos );
  }

  abrirNoticia(){
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarBtn;

    if (this.enFavoritos){
      // Borrar de favoritos
      guardarBorrarBtn =  {
        text: 'Borrar de favoritos',
        icon: 'trash-bin-outline',
        cssClass: 'accion-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };

    } else{
      guardarBorrarBtn =  {
        text: 'Faborito',
        icon: 'star-outline',
        cssClass: 'accion-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'accion-dark',
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'accion-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close-outline',
        cssClass: 'accion-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
