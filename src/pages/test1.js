//forEach
let arr=['a','b','c']
let arr1=[]
let arr2=[
  {a:1,b:2,c:3,d:4},
  {a:5,b:6,c:7,d:8}
]
arr2.forEach((item,index)=>{
  arr1[index]={}
  arr.forEach(subitem=>{
    arr1[index][subitem]=item[subitem] || null
  })
})
console.log(arr1)


