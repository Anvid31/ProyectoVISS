import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdfs',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css'
})
export class PdfsComponent {
  mes: string = 'Enero';
  anio: string = '2024';
  totalGastos: number = 1500;
  totalVentas: number = 2000;
  totalActual: number = 500;
  data = [
    { nombre: 'Alquiler', descripcion: 'Pago de alquiler mensual', cantidad: 800, fecha: '2024-01-05' },
    { nombre: 'Servicios', descripcion: 'Pago de electricidad y agua', cantidad: 300, fecha: '2024-01-10' },
  ];
  data2 = [
    { nombre: 'Venta de producto A', descripcion: 'Venta realizada a cliente', cantidad: 1200, fecha: '2024-01-15' },
    { nombre: 'Venta de producto B', descripcion: 'Venta realizada a cliente', cantidad: 800, fecha: '2024-01-20' },
  ];

  generarPDF(): void {
    const doc = new jsPDF();

    // Construcción del PDF
    doc.setFontSize(20);
    doc.text('TaxTrack - Extracto Mensual', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Periodo: ${this.mes} ${this.anio}`, 10, 40);

    doc.setFontSize(16);
    doc.text('Resumen General', 10, 50);
    doc.setFontSize(12);
    doc.text(`Total Gastos: $${this.totalGastos}`, 10, 60);
    doc.text(`Total Ventas: $${this.totalVentas}`, 10, 70);
    doc.text(`Total Actual: $${this.totalActual}`, 10, 80);

    let yPosition = 100;
    doc.setFontSize(16);
    doc.text('Detalles de Gastos', 10, yPosition);
    yPosition += 10;
    this.data.forEach((gasto) => {
      doc.setFontSize(12);
      doc.text(`Nombre: ${gasto.nombre}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Descripción: ${gasto.descripcion}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Cantidad: $${gasto.cantidad}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Fecha: ${gasto.fecha}`, 10, yPosition);
      yPosition += 10;
    });

    yPosition += 10;
    doc.setFontSize(16);
    doc.text('Detalles de Ventas', 10, yPosition);
    yPosition += 10;
    this.data2.forEach((venta) => {
      doc.setFontSize(12);
      doc.text(`Nombre: ${venta.nombre}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Descripción: ${venta.descripcion}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Cantidad: $${venta.cantidad}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Fecha: ${venta.fecha}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save('ExtractoMensual.pdf');
  }
}