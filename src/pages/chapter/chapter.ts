import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chapter } from "../../domain/chapter";
import { Lesson } from "../../domain/lesson";
import { Http, RequestOptions, Headers } from "@angular/http";
import { SentencePage } from '../../pages/sentence/sentence';

@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  public currentChapter: Chapter = new Chapter();
  public lessons: Array<Lesson> = [];
  public summayList: Array<String> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: Http) {
    this.currentChapter = navParams.get('currentChapter');

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });


    this._http.get(this.currentChapter._links.lessons.href, options)
      .map(res => res.json()._embedded.lessons)
      .toPromise()
      .then(res => this.lessons = res as Lesson[])
      .catch(e => console.error(e));
  }

  onLessonSelect(selectedLesson: Lesson): void {
    this.navCtrl.push(SentencePage, {
      currentLesson: selectedLesson
    });
  }

}
