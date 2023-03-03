import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../enum/dataState.enum';
import { StatusServer } from '../enum/statusServer.enum';
import { AppState } from '../interface/appState';
import { CustomResponse } from '../interface/customResponse';
import { Server } from '../interface/server';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit{
  serversData$ : Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly StatusServer = StatusServer;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private serverService:ServerService){
  }
  
  ngOnInit(): void {
    this.serversData$=this.serverService.getAllServers$
  .pipe(
    map(
      response=>{
        console.log(response);
        this.dataSubject.next(response) ;
        return { dataState: DataState.LOADED_STATE, appData : response}
      }
    ),
    startWith({
      dataState: DataState.LOADING_STATE}
    ),
    catchError((error:string)=>{
      console.log(error);
      return of( {dataState: DataState.ERROR_STATE, error })
    })
  );
  }

  pingServer(ipAddress:string):void{
    this.filterSubject.next(ipAddress);
    this.serversData$=this.serverService.ping$(ipAddress)
    .pipe(
      map(
        response=>{
          console.log("kkk");
          console.log(response.data.server.id);
          const index = this.dataSubject.value.data.Servers.findIndex(server=>server.id === response.data.server.id);
          console.log("kkk");
          console.log(index);
          this.dataSubject.value.data.Servers[index] = response.data.server;
          this.filterSubject.next('');
          return {dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}
        }
      ),
      startWith({dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}),
      catchError((error:string)=>{
        console.log(error);
        this.filterSubject.next('');
        return of({dataState:DataState.ERROR_STATE,error})
      }
      )
      )
  }

  filterServers(statusServer:StatusServer):void{
    this.serversData$=this.serverService.filter$(statusServer,this.dataSubject.value)
    .pipe(
      map(response=>{
        return {dataState:DataState.LOADED_STATE,appData:response}
      }
      ),
      startWith({dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}),
      catchError((error:string)=>{
        return of({dataState:DataState.ERROR_STATE,error})
      })
    )
  }
  saveServer(server:NgForm):void{
    this.isLoading.next(true);
    this.serversData$=this.serverService.AddNewServer$(server.value)
    .pipe(
      map(
        response=>{
          this.dataSubject.next(
            {
              ...response,
              data:{Servers:[...this.dataSubject.value.data.Servers,response.data.server]}
            }
          )
          document.getElementById("closeModal").click();
          this.isLoading.next(false);
          server.resetForm({statusServer:this.StatusServer.SERVER_DOWN});
          return ({dataState: DataState.LOADED_STATE,appData: this.dataSubject.value })
        }
      ),
      startWith({dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}),
      catchError((error:string)=>{
        this.isLoading.next(false);
        return of({dataState:DataState.ERROR_STATE,error})
      })
    )
  }
  deleteServer(id:number):void{
    console.log(id);
    this.serversData$=this.serverService.deleteServer$(id)
    .pipe(
      map(
        response=>{
          console.log("hhello");
          console.log(response.data.server);
         // const index = this.dataSubject.value.data.Servers.findIndex(server=>server.id === id);
          //console.log(index);
          this.dataSubject.next(
            {
              ...response,
              data:{Servers:this.dataSubject.value.data.Servers.filter(
                s=>s.id !== id
              )}
            }
          )
          return {dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}
        }
      ),
      startWith({dataState:DataState.LOADED_STATE,appData:this.dataSubject.value}),
      catchError((error:string)=>{
        return of({dataState:DataState.ERROR_STATE,error})
      })
    )
  }
  printReport(){
   // window.print();
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('servers');
    let tableHtml = tableSelect.outerHTML.replace(/ /g,'%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType +',' +tableHtml;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
 
}
