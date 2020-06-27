import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems():Observable <Item[]>{
    return this.http.get<Item[]>('http://localhost:8000/api/items/');

    }
}
