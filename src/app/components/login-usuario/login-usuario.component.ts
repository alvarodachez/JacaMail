import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AuntenticadorJwtService } from '../../services/auntenticador-jwt.service';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  ocultarPassword: boolean = true;

  loginForm: FormGroup;
  constructor(private usuarioService: UsuarioService, private router: Router, private autenticadorJwt: AuntenticadorJwtService, private comunicacionAlertasService: ComunicacionDeAlertasService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('alvarodachez', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('1234', [Validators.required])
      //81dc9bdb52d04dc20036dbd8313ed055
    });
  }

  autenticaUsuario() {

    this.comunicacionAlertasService.abrirDialogCargando();

    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value, this.loginForm.controls.password.value).subscribe(data => {
      console.log(data.jwt);

      if (data.jwt != undefined) {
        this.autenticadorJwt.almacenaJWT(data.jwt);
        this.router.navigate(['listadoMensajes']);
        this.comunicacionAlertasService.cerrarDialogo();
        this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
      } else {
        console.log('Datos erroneos')
        this.comunicacionAlertasService.abrirDialogError('El usuario y la contraseña son incorrectos.')
      }
    });

  }

}
