function GenerateGrid(){
    
   
    document.getElementById('Grid').innerHTML="";
 let n= document.getElementById("size").value;

 if((n%Math.floor(Math.sqrt(n))) != 0){
   
    document.write(`
    <p id="backbutton" style="color:blue; text-decoration:underline;  cursor:pointer;">back<\p>
    <h1>Error<\h1>
    <h2>Unable to solve<\h2>
    <h2>please Use another value of n<\h2>`);
    document.getElementById("backbutton").addEventListener("click",()=>{
        location.reload();
     })
    return;
}
var tbl = document.createElement('table');

for(var i=0;i<n;i++){
var tbr=document.createElement('tr');
for(var j=0;j<n;j++){
  var tbC=document.createElement('td');
  var inp=document.createElement('input');
  inp.type="number";
  inp.classList.add("Number_value");
  tbC.appendChild(inp);
  tbr.appendChild(tbC);
}
tbl.appendChild(tbr);
}
document.getElementById('Grid').appendChild(tbl);
document.getElementById("solution").style.display="inline";
}
function isSafe(i,j,v,x){
    var n=v[0].length;
    
for(var k=0;k<n;k++)
if(v[i][k] == x)
return false;
for(var k=0;k<n;k++)
if(v[k][j] == x)
return false;
var p=Math.floor(Math.sqrt(n));
var q= Math.floor(n/p);
if(p<q){
    var tp=q;
    q=p;
    p=tp;
}
var s=(i - (i%q));
var t=(j - (j%p));
for(var k=s;k<s+q;k++)
for(var l=t;l<t+p;l++)
if(v[k][l]==x)
return false;
return true;
}


function sudoku(v){
    var val=false;
for(var i=0;i<v[0].length;i++)
for(var j=0;j<v[0].length;j++){
    if(v[i][j]==0){
      
        for(var m=1;m<=v[0].length;m++)
        if(isSafe(i,j,v,m)){
        
            val=true;
         v[i][j]=m;
        if(sudoku(v))
        return true ;
       else{
        v[i][j]=0;
        val=false;
       }
        }
        if(!val)
        return val;
    }
    
}
return true;
}
document.getElementById("solution").addEventListener("click",()=>{
    
    var array=[];
   
  var node=  document.querySelectorAll(".Number_value");
  node.forEach((element)=>{
     if(element.value=="")
     array.push(0);
     else
     array.push(element.value);
    
  });
 
  var grid=[];
 
  let n=Math.sqrt(array.length);
  for(var i=0;i<n*n;i=i+n){
grid.push(array.slice(i,i+n));
  }
  var p=sudoku(grid);
if(!p){
    document.write(`
    <p id="backbutton" style="color:blue; text-decoration:underline;  cursor:pointer;">back<\p>
    <h1>Error<\h1>
    <h2>Unable to solve<\h2>
    <h2>please Use another value of n<\h2>`);
    document.getElementById("backbutton").addEventListener("click",()=>{
        location.reload();
     })
    return;  
}
   array=[];
   var count=0;
   for(var i=0;i<n;i++)
   for(var j=0;j<n;j++){
array.push(grid[i][j]);
}
var finalnode=  document.querySelectorAll(".Number_value");
finalnode.forEach((element)=>{
   element.value=array[count];
  count++;
}); 
})
