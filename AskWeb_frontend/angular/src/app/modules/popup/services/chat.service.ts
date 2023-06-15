import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../../../model/Message";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _backendUrl: string =  environment.backendUrl
  private _apiUrlPostPage: string =  environment.apiUrlPostPage
  private _apiUrlPostQuery: string =  environment.apiUrlPostQuery


  constructor(private _http: HttpClient) { }

  public executeSendContentOfPage(msg :Message) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    const url = this._backendUrl + this._apiUrlPostPage
    console.log("Effetto (executeSendContentOfPage) la post"+ " url("+url+")"+ " con: "+ msg)
    return this._http.post(url,
      msg, options)
  }


  public executeQueryContent(msg :Message) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers };
    const url = this._backendUrl + this._apiUrlPostQuery
    console.log("Effetto (executeQueryContent) la post"+ " query("+msg.content+")" + " url("+url+")")
    return this._http.post(url,
      msg, options)
  }


}
