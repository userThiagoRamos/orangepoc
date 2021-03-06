import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAuth, User} from '@ionic/cloud-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleAuth : GoogleAuth, public user : User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.googleAuth.login().then();

  }

}
