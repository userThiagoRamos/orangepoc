import { Component } from '@angular/core';
import { NavController, NavParams , Platform} from 'ionic-angular';
import { Lesson } from "../../domain/lesson";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Sentence } from "../../domain/sentence";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech'

@Component({
  selector: 'page-sentence',
  templateUrl: 'sentence.html',
})
export class SentencePage {

  speechList: any[];

  public currentLesson: Lesson = new Lesson();
  public sentences: Array<Sentence> = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: Http, private _tts : TextToSpeech, private _speechRecognition : SpeechRecognition, private _platform : Platform) {
    this.currentLesson = navParams.get('currentLesson');

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this._http.get(this.currentLesson._links.sentenses.href, options)
      .map(res => res.json()._embedded.sentences)
      .toPromise()
      .then(res => this.sentences = res as Sentence[])
      .catch(e => console.error(e));
  }

   async read(sentence):Promise<any>{
    try{
      await this._tts.speak(sentence);
    }
    catch(e){
      console.log(e);
    }
  }

  listenForSpeech(): void {

    this.speechList = [];

    // this._androidOptions = {
    //   prompt: 'Speak into your phone! And show me what you got!!',
    //   matches: 1
    // }

    // this.iosOptions = {
    //   language: 'en-US'
    // }

    if (this._platform.is('android')) {
      this._speechRecognition.startListening().subscribe(data => this.speechList = data, error => console.log(error));
    }
    // else if (this._platform.is('ios')) {
    //   this._speechRecognition.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
    // }
  }

}
