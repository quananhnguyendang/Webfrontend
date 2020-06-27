import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {Item, Vehical} from '../models/item';
import {Item1} from '../models/item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//export interface Item { id?: string; name?: string; }
// export interface Item1 { id?: string; manufacturer?: string; name?: string; price?: string; type?: string }


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item1>;
	itemss: Observable<Item1[]>;

  bienId=''; 
  bienManufacturer='';
  bienName=''; 
  bienPrice='';
  bienType='';
  bienIdl = '';
  bienstatus =false;

  searchProduct = '';
  productSearchFinal = [];


  constructor(private readonly afs: AngularFirestore,private fb:FormBuilder) {
    this.itemsCollection = afs.collection<Item1>('Itemss');
    //this.items = this.itemsCollection.valueChanges(); 
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. Only using for versions 7 and earlier
    this.itemss = this.itemsCollection.valueChanges( { idField: 'id1' }); //chỉ sử dụng cho Angular 8,9
    //id1: ten field đại diện cho documnent id, lưu ý không 
    //được đặt trùng với tên field khai báo trong dữ liệu
  }
  registerForm: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id:['',Validators.required], 
      manufacturer:['',Validators.required],
      name:['',Validators.required,Validators.email],
      price:['',[Validators.min(1000), Validators.max(2000000000)]],
      status:['',Validators.required],
      type:['',Validators.required]},
      
    )
    }

  Add (Id:string="default id1", name:string="default item", manufacturer:string="default manu", price:string="default price", type:string="default type"){
    let it : Item1 = {};
    it.id=Id
    it.name = name
    it.manufacturer=manufacturer
    it.price=price
    it.type=type

    //let docid="id3"
  // tạo docid bằng AngularFirestore
  
	const id = this.afs.createId();

  this.itemsCollection.add(it);//thêm với docid tự động tạo
    
    //them vao itemsCollection với docid cụ thể
    //this.itemsCollection.doc(docid).set(Object.assign({}, it));//Object.assign({} khong co lenh nay thi se khong them vao firebase duoc
  }


  Update (id:string="update id", name:string="update item", manufacturer:string="update manu", price:string="update price", type:string="update type"){
    let docId = "9LWJy4HFbhgPloj0GRpf"
    let it : Item1 = {};
    it.id=id
    it.name = name
    it.manufacturer=manufacturer
    it.price=price
    it.type=type
  
    this.itemsCollection.doc(docId).update(it);
  }
  Delete (docId){
       this.itemsCollection.doc(docId).delete();
  }

  getID(event){
    this.bienId = event.target.value;
    console.log(this.bienId);
  }
  getManufacturer(event){
    this.bienManufacturer = event.target.value;
    console.log(this.bienManufacturer);

  }
  getName(event){
    this.bienName = event.target.value;
  }
  getPrice(event){
    this.bienPrice = event.target.value;
  }
  getType(event){
    this.bienType = event.target.value;
  }
  getStatus(event){
    this.bienstatus = event.target.value;
    console.log(this.bienstatus);
  }
  AddNew(
    id: string = this.bienId,
    manufacturer: string = this.bienManufacturer,
    name: string = this.bienName,
    price: string = this.bienPrice,
    type: string = this.bienType,
    status: boolean = this.bienstatus
  ) {
    const bien: Item1 = {};
    const docId = this.afs.createId();
    bien.id = id;
    bien.manufacturer = manufacturer;
    bien.name = name;
    bien.price = price;
    bien.type = type;
    bien.status = status;
    this.itemsCollection.add(bien);
}
getData(
    code,
    id,
    manufacturer,
    name,
    price,
    type,
    status
){
  this.bienIdl = code;
  this.bienId = id;
  this.bienManufacturer=manufacturer;
  this.bienName=name;
  this.bienPrice=price;
  this.bienType=type;
  this.bienstatus=status
  console.log(this.bienIdl);
}
update(
  id: string = this.bienId,
  manufacturer: string = this.bienManufacturer,
  name: string = this.bienName,
  price: string = this.bienPrice,
  type: string = this.bienType,
  status: boolean = this.bienstatus
) {
  const docId = this.bienIdl;
  const bien: Item1 = {};
  bien.id = id;
  bien.manufacturer = manufacturer;
  bien.name = name;
  bien.price = price;
  bien.type = type;
  bien.status = status;
  this.itemsCollection.doc(docId).update(bien);
}
changeStatus(log){
  if (log === 'true'){
    return true;
  }
  else {
    return false;
  }
}

onSetSearchProduct(event: KeyboardEvent) { 
  this.searchProduct = (event.target as HTMLInputElement).value;
  console.log(this.searchProduct)
  this.productSearchFinal = this.productsFound();
  console.log(this.productSearchFinal)
}


itemFound =  () => {
  return this.findProductBy(this.bienName, this.itemss);
} 
productsFound = () => {
  let itemTemp = this.itemFound()
  return itemTemp.length === 1 && 
  this.comp(this.searchProduct, itemTemp[0].bienName) ? [] : itemTemp
}
comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

findProductBy(queryItem, items) {
  console.log(items)
  console.log(queryItem)
  if (queryItem === '') {
      return [];
  }
  var regEscape = this.escapeRegExp(queryItem)
  const regex = new RegExp(`${regEscape.trim()}`, 'i');
  return items.filter(dataItem =>
      dataItem.bienName.search(regex) >= 0);
}
escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
}
