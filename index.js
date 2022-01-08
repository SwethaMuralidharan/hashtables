class HashTable{
  constructor(){
    this.table = new Array(57);
    this.numItems=0;
  }
  hashStrtoInt = (key,tableSize)=>{
    let hash = 17;
    for(let i=0;i<key.length;i++){
      hash=hash*key.charCodeAt(i);
    }
    return hash%tableSize
  }
  resize = ()=>{
    const newTable = new Array(this.table.length*2);

    this.table.forEach(item=>{
      if(item){
          item.forEach(([key,value])=>{
          const index = this.hashStrtoInt(key,newTable.length);
          if(newTable[index]){
            newTable[index].push([key,value])
          }else{
            newTable[index]=[[key,value]];
          }
        })
      }
    })
    return newTable;   
  }   
  setItem = (key,value)=>{
    this.numItems++;
    const index = this.hashStrtoInt(key,this.table.length);
    const loadFactor=this.numItems/this.table.length;
    if(loadFactor>0.8){
      this.table=this.resize();
    }
    if(this.table[index]){
      this.table[index].push([key,value])
    }else{
      this.table[index]=[[key,value]];
    }
    
  }
  getItem = (key)=>{
    const index = this.hashStrtoInt(key,this.table.length);
    if(this.table[index]){
      return this.table[index].find(x=>x[0]===key)[1];
    }
    else{
      return null;
    }
  }
}
const myTable=new HashTable();
myTable.setItem('firstName','john');
console.log(myTable.table.length)
myTable.setItem('lastName','doe');
console.log(myTable.table.length);
myTable.setItem('address','california');
console.log(myTable.table.length);
myTable.setItem('phoneNum','672389563489');
console.log(myTable.table.length);
// console.log(myTable.getItem('firstName'));
// console.log(myTable.getItem('lastName'));
// console.log(myTable.getItem('address'));
// console.log(myTable.getItem('phoneNum'));
console.log(myTable.table);