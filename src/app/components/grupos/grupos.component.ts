import { Component, OnInit } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
  providers: [MessageService]
})
export class GruposComponent implements OnInit {
  usuario: Usuario[] = []
  cont = 0
  coordinador: Usuario[] = []
  
  constructor(private usuariosService:UsuariosService, private messageService:MessageService, public lol: UsuariosService) { 
    this.usuariosService.getUsuarios().subscribe(data=>this.usuario=data.filter(data=>data.coordinador==false))
    this.usuariosService.getUsuarios().subscribe(data=>this.coordinador=data.filter(data=>data.coordinador==true))
   }
  
  ngOnInit(): void {
  }                  // No he logrado poder cambiar los datos de usuario-coordinador pero si se muestra el filtro de usuario-coordinador
  changeToCoord(){
    this.cont = 0
    this.showSuccess()
    while(this.cont < this.coordinador.length){
      if(this.coordinador.filter(coordinador => coordinador.coordinador == false)){ 
        this.coordinador[this.cont].coordinador = true
        this.cont++
      }
      else{
        this.cont = 0
      }
    }
  }
  changeToUser(){
    this.cont = 0
    
    while(this.cont < this.usuario.length){
      if(this.usuariosService.getUsuarios().subscribe(data=>this.usuario=data.filter(data=>data.coordinador==false))) 
      {
        this.usuario[this.cont].coordinador = false
        this.cont++
      }
      else{
        this.cont = 0
      }
    }
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Datos actualizados'});
}
}