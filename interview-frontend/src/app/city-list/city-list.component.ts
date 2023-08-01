import { Component, OnInit, ViewChild } from '@angular/core';
import { CitiesService } from '../cities.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface City {
  uuid: string;
  cityName: string;
  count: number
}

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['cityName', 'count'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  searchKey: string;

  title = 'city-ui';

  constructor(private citiesSerice: CitiesService) {
    this.listData = new MatTableDataSource<any>();
    this.searchKey = '';
  }
  ngOnInit() {
    this.citiesSerice.getCities().subscribe((data) => {
      let array = data as City[];
      this.listData = new MatTableDataSource(array);
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return data.cityName.toLowerCase().indexOf(filter) != -1;
      };
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
