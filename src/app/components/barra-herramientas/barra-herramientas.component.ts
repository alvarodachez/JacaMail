import { Component, OnInit } from '@angular/core';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { AutenticadorJwtService } from '../../../../../AngularMailClienteModulo6/src/app/services/autenticador-jwt.service';
import { Router } from '@angular/router';
import { DialogTypes } from '../dialogo-general/dialog-data-type';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  usuarioAutenticado: Usuario;

  constructor(private comunicacionAlertasService: ComunicacionDeAlertasService, private autenticacionJwt: AutenticadorJwtService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    })
  }

  navegarHaciaPrincipal() {
    this.router.navigate(['/listadoMensajes']);
  }


  confirmacionAbandonarSesion() {
    this.comunicacionAlertasService.abrirDialogConfirmacion('¿Realmente desea abandonar la sesión?').subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.autenticacionJwt.eliminaJWT();
        this.router.navigate(['/login']);
      }
    });
  }


  navegarHaciaCambiaPassword() {
    this.router.navigate(['/cambioPassword']);
  }



  navegarHaciaDatosPersonales() {
    this.router.navigate(['/datosUsuario']);
  }

}
