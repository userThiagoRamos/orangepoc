import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Chapter } from '../../domain/chapter';
import { ChapterPage} from '../chapter/chapter';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  speechList: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;
  senteces = [];
  chapters = [];
  private conLocal: string = "http://localhost:8080/chapters";
  private conRemote: string = "https://orange-be.herokuapp.com/chapters";

  constructor(public navCtrl: NavController, private _speechRecognition: SpeechRecognition, private _plataform: Platform, private _toast: ToastController, private _http: Http, private tts: TextToSpeech) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this._http.get(this.conRemote, options)
      .map(res => res.json()._embedded.chapters)
      .toPromise()
      .then(res => this.chapters = res as Chapter[])
      .catch(e => console.error(e));
  }

  onChapterSelect(selectedChapter: Chapter): void {
    this.navCtrl.push(ChapterPage, {
      currentChapter: selectedChapter
    });
  }


}
