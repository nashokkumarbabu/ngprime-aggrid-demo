import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @ViewChild('agGrid', { static : true}) agGrid: AgGridAngular;

    title = 'app';

    columnDefs = [
        {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
        {headerName: 'Model', field: 'model', sortable: true, filter: true },
        {headerName: 'Price', field: 'price', sortable: true, filter: true }
    ];

    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }

}
