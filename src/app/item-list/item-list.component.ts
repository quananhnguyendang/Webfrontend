import { Component, OnInit } from '@angular/core';
import { ItemService } from '../servies/item.service';
import { Observable } from 'rxjs';
import {Item} from '../models/item';
import {Item1} from '../models/item'


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemService: ItemService) { }
  itemList: Observable<Item1[]>;
  itemList1: Item1[];
  ngOnInit(): void {
    this.itemList = this.itemService.getItems();
    this.itemService.getItems().subscribe(data => this.itemList1 = data)
  }

}
