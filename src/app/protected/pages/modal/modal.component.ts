import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WorkService } from '../../services/work.service';
import { WorkResponse } from '../../interfaces/work.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() registro!: WorkResponse

  constructor(
    private workService: WorkService,
    private formBuilder: FormBuilder,
  ) {}
    
  ngOnInit(): void {
    
    // console.log(this.nombreValor);
    // Crea un objeto de tipo date con el la fecha del registro.
    var fecha = new Date(this.registro.fecha)

    const fechaISO = fecha.toISOString(); // formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
    const fechaCorta = fechaISO.substring(0, 10); // "YYYY-MM-DD"

    // Crea un objeto con los datos del @Input
    const datosDelRegistro = {
      nombre: this.registro.nombre,
      descripcion: this.registro.descripcion,
      fecha: fechaCorta
    }
    this.formularioUpdate.patchValue(datosDelRegistro)
  }

  cerrarModal(){
    this.workService.$modal.emit(false)
  }


  formularioUpdate: FormGroup = this.formBuilder.group({
    image: [,],
    nombre: [, Validators.required],
    descripcion: [, Validators.required],
    fecha: [, Validators.required],
    factura: [,]
  })


  // Metodo para validar el archivo que se +
  // selecciona como 'Imagen'.
  validarImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileI = event.target.files[0]
      if (fileI && (fileI.type === 'image/jpeg' || fileI.type === 'image/png')) {
        this.formularioUpdate.patchValue({
          image: fileI,
        })
      } else {
        this.formularioUpdate.patchValue({
          image: null,
        })
      }
    }
  }


  validarFactura(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileF = event.target.files[0]
      if (fileF && (fileF.type === 'application/pdf')) {
        this.formularioUpdate.patchValue({
          factura: fileF,
        })
      } else {
        this.formularioUpdate.patchValue({
          factura: null,
        })
      }
    }
  }


  ValidarCampo(campo: string) {
    return this.formularioUpdate.controls[campo].errors && this.formularioUpdate.controls[campo].touched
  }


  ActualizarRegistro(id: string){
    if (this.formularioUpdate.invalid) {

      this.formularioUpdate.markAllAsTouched()
      
    } else {

      const formData = new FormData()

      formData.append('nombre', this.formularioUpdate.get('nombre')?.value)
      formData.append('descripcion', this.formularioUpdate.get('descripcion')?.value)
      formData.append('fecha', this.formularioUpdate.get('fecha')?.value)
      formData.append('image', this.formularioUpdate.get('image')?.value)
      formData.append('factura', this.formularioUpdate.get('factura')?.value)

      this.workService.Update(id, formData).subscribe(
        res => {
          if(res === true){

            this.cerrarModal()

            this.refresh()
            // Mandara una alerta si se actualizo.
            // Swal.fire({
            //   position: 'top-right',
            //   icon: 'success',
            //   title: 'Registro Actualizado',
            //   showConfirmButton: false,
            //   timer: 1000
            // })

          } else {
            // SI hay error, mandara una alerta, con el error.
            Swal.fire('Error', res, 'error')
          }
        }
      )
    }
  }

  
  eliminarRegistro(id: string){

    const res = confirm('¿Estas seguro de Borrar este Registro?')
    
    if (res === true ) {
      this.workService.Delete(id).subscribe(
        res => {
          if(res === true){

            this.cerrarModal()

            this.refresh()

          } else {
            // SI hay error, mandara una alerta, con el error.
            Swal.fire('Error', res, 'error')
          }
        }
      )
    }
  }

  mostrarFirma(){
    if (this.workService.userAuth.nombre == 'Administrador') {
      return true
    } else {
      return false
    }
  }

  refresh() {
    window.location.reload();
  }
}